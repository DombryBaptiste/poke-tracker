import { computed, effect, Injectable, signal } from '@angular/core';
import { AppData } from '../entities/appData';
import { PokemonSelected } from '../entities/pokemonSelected';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public step = 30
  public generations = [1, 2, 3, 4];
  public numberLimitByGenerations = [
    { generation: 1, limits: 151 },
    { generation: 2, limits: 251 },
    { generation: 3, limits: 386 },
    { generation: 4, limits: 493 },
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
        console.log("EFFECT")
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
}
