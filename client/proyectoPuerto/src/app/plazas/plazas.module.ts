import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlazaComponent } from './components/plaza/plaza.component';
import { ListaComponent } from './components/lista/lista.component';



@NgModule({
  declarations: [
    PlazaComponent,
    ListaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlazasModule { }
