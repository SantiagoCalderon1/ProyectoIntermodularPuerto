import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListamuellesComponent } from './components/listamuelles/listamuelles.component';
import { FormmuellesComponent } from './components/formmuelles/formmuelles.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListamuellesComponent,
    FormmuellesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ListamuellesComponent,
    FormmuellesComponent
  ]
})
export class MuellesModule { }
