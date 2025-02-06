import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlazaComponent } from './components/plaza/plaza.component';
import { ListaComponent } from './components/lista/lista.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PlazaComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [RouterModule]
})
export class PlazasModule { }
