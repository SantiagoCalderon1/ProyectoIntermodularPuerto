import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaFacturasComponent } from './components/lista-facturas/lista-facturas.component';
import { FacturaComponent } from './components/factura/factura.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ListaFacturasComponent,
    FacturaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule
  ]
})
export class FacturasModule {

}
