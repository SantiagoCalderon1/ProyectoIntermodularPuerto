import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './components/lista/lista.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InstalacionComponent } from './components/creacion/instalacion.component';



@NgModule({
  declarations: [
    ListaComponent,
    InstalacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ListaComponent,
    InstalacionComponent
  ]
})
export class InstalacionModule { }
