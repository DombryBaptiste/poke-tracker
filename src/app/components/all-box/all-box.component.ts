import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { BoxComponent } from "../box/box.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-box',
  imports: [BoxComponent, CommonModule],
  templateUrl: './all-box.component.html',
  styleUrl: './all-box.component.scss'
})
export class AllBoxComponent implements OnInit {

  public boxNumbers: [number, number][] = [];

  constructor(public pokeService: PokemonService) { }

  ngOnInit(): void {

  }

}
