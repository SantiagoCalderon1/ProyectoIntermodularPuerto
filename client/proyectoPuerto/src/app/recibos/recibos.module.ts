import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarecibosComponent } from './listarecibos/listarecibos.component';
import { ReciboComponent } from './recibo/recibo.component';



@NgModule({
  declarations: [
    ListarecibosComponent,
    ReciboComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RecibosModule { }
