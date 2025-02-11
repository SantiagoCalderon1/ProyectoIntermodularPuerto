import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripulantesComponent } from './components/tripulantes/tripulantes.component';
import { TripulantesListComponent } from './components/tripulantes-list/tripulantes-list.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TripulantesComponent,
    TripulantesListComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    FormsModule,
  ]
})
export class TransitosModule { }
