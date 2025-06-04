import { computed, effect, Injectable, signal } from '@angular/core';
import { AppData } from '../entities/appData';
import { PokemonColor, PokemonSelected } from '../entities/pokemonSelected';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public step = 30
  public generations = [1, 2, 3, 4, 5];
  public numberLimitByGenerations = [
    { generation: 1, limits: 151 },
    { generation: 2, limits: 251 },
    { generation: 3, limits: 386 },
    { generation: 4, limits: 493 },
    { generation: 5, limits: 649 }
  ];

  public data = signal<AppData>({
    genSelected: 1,
    pokemonSelected: []
  });

  constructor() {
    const storedData = localStorage.getItem('data');
    if(storedData)
    {
      try {
        this.data.set(JSON.parse(storedData));
      } catch(e)
      {
        console.error(e);
      }
    }
    effect(() => {
        localStorage.setItem('data', JSON.stringify(this.data()));
      });
  }

  public boxNumber = computed(() => {
    const data = this.data();
    const genData = this.numberLimitByGenerations.find(g => g.generation === data.genSelected);
    if(!genData)
    {
      return [];
    }

    const boxes: [number, number][] = [];
    
    for (let i = 1; i <= genData.limits; i += this.step) {
      boxes.push([i, Math.min(i + this.step - 1, genData.limits)]);
      
    }
    return boxes;
  })

  public setData(appData: AppData)
  {
    this.data.set(appData);
  }


  public setSelectedGeneration(gen: number) {
    this.data.update(current => ({
      ...current,
      genSelected: gen
    }));
  }

  public addPokemon(pokemon: PokemonSelected)
  {
    this.data.update(current => ({
      ...current,
      pokemonSelected: [...current.pokemonSelected, pokemon]
    }))
  }

  public updatePokemon(pokemon: PokemonSelected)
  {
    this.data.update(current => {
      const updatedList = current.pokemonSelected.map(p => 
        p.id === pokemon.id ? {...p, ...pokemon} : p
      );
      return {
        ...current,
        pokemonSelected: updatedList
      }
    })
  }

  public deletePokemon(pokemonId: number) {
    this.data.update(current => {
      const filteredList = current.pokemonSelected.filter(p => p.id !== pokemonId);
      return {
        ...current,
        pokemonSelected: filteredList
      };
    });
  }

  public downloadData()
  {
    const blob = new Blob([JSON.stringify(this.data(), null, 2)], {
      type: 'application/json'
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sauvegarde.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  public importData(event: Event)
  {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const raw = JSON.parse(reader.result as string);

        if (!this.isValidAppData(raw)) {
          throw new Error("Le fichier importé ne correspond pas au format attendu.");
        }

      const importedData = raw as AppData;
      console.log('Données importées :', importedData);

        this.setData(importedData);

      } catch (error) {
        console.error('Erreur de parsing du fichier importé', error);
      }
    };

    reader.readAsText(file);
  }

  public getTotalPokemon(color: PokemonColor): number {
    const limit = this.numberLimitByGenerations.find(n => n.generation == this.data().genSelected)?.limits
    if(limit)
    {
      return this.data().pokemonSelected.filter(p =>
        p.color == color &&
        p.id <= limit).length
    }
    return 0;
  }

  private isValidAppData(data: any): data is AppData {
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof data.genSelected === 'number' &&
      Array.isArray(data.pokemonSelected)
    )
  }

  public getLimit(): number
  {
    const limit = this.numberLimitByGenerations.find(n => n.generation == this.data().genSelected)?.limits
    return limit ? limit : 0;
  }
}
