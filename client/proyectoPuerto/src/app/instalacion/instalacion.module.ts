import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstalacionComponent } from './instalacion.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [InstalacionComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports : [InstalacionComponent]
})
export class InstalacionModule { }
