import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonColor, PokemonSelected } from '../../entities/pokemonSelected';

@Component({
  selector: 'app-box',
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent implements OnInit{

  @Input() boxName!: string;
  @Input() limits!: [number, number];

  listLimit: number[] = [];

  constructor(private pokeService: PokemonService) { }

  ngOnInit(): void {
    const [start, end] = this.limits;
    for (let i = start; i <= end; i++) {
      this.listLimit.push(i);
    }
  }

  onClickPokemon(idPokemon: number)
  {
    const currentList = this.pokeService.data().pokemonSelected;
    const existingPokemon = currentList.find(p => p.id == idPokemon);
    console.log(existingPokemon);

    if(!existingPokemon)
    {
      this.pokeService.addPokemon({id: idPokemon, color: PokemonColor.Red});
    } else {
      let newColor: PokemonColor | null = this.getNewColor(existingPokemon.color)
      console.log(newColor)

      if(newColor)
      {
        this.pokeService.updatePokemon({ id: idPokemon, color: newColor })
      } else {
        this.pokeService.deletePokemon(idPokemon);
      }
    }
  }

  getPokemonColor(pokemonId: number): string {
    const pokemon = this.pokeService.data().pokemonSelected.find(p => p.id === pokemonId);
    if (!pokemon) {
      return 'transparent'; // pas sélectionné = pas de bg
    }

    switch(pokemon.color) {
      case PokemonColor.Red:
        return 'red';
      case PokemonColor.Blue:
        return 'blue';
      case PokemonColor.Black:
        return 'black';
      default:
        return 'transparent';
  }
}

  private getNewColor(oldColor: PokemonColor): PokemonColor | null
  {
    switch(oldColor)
      {
        case PokemonColor.Red:
          return PokemonColor.Blue;
        case PokemonColor.Blue:
          return PokemonColor.Black
        case PokemonColor.Black:
          return null;
        default:
          return PokemonColor.Red;
      }
  }
}
