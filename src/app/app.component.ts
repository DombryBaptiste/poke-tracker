import { Component } from '@angular/core';
import { AllBoxComponent } from "./components/all-box/all-box.component";
import { PokemonService } from './services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppData } from './entities/appData';

@Component({
  selector: 'app-root',
  imports: [AllBoxComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  data: AppData;

  constructor(public pokeService: PokemonService) {
    this.data = this.pokeService.data();
  }

  
onGenerationChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedValue = +selectElement.value;
  this.pokeService.setSelectedGeneration(selectedValue);
}
}
