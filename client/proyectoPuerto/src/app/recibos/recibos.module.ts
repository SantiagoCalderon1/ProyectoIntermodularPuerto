import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarecibosComponent } from './listarecibos/listarecibos.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListarecibosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ListarecibosComponent,
  ]
})
export class RecibosModule { }
