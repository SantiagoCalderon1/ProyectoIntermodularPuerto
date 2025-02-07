import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstalacionModule } from './instalacion/instalacion.module';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InstalacionComponent } from './instalacion/components/creacion/instalacion.component';
import { ListaComponent } from './instalacion/components/lista/lista.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    InstalacionModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
