import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './components/lista/lista.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [    
    ListaComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ListaComponent,
    FormularioComponent
  ]
})
export class RolesModule { }
