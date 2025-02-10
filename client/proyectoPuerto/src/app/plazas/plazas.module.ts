import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlazaComponent } from './components/plaza/plaza.component';
import { ListaComponent } from './components/lista/lista.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    PlazaComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    FormsModule,
  ]
})
export class PlazasModule { }
