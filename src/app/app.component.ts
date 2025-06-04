import { Component } from '@angular/core';
import { AllBoxComponent } from "./components/all-box/all-box.component";
import { PokemonService } from './services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppData } from './entities/appData';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  imports: [
    AllBoxComponent,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  data: AppData;

  constructor(public pokeService: PokemonService) {
    this.data = this.pokeService.data();
  }

  
onGenerationChange(event: MatSelectChange): void {
  const genNumber = event.value;
  this.pokeService.setSelectedGeneration(genNumber);
}
}
