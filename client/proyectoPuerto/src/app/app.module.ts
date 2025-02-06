import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { HomeComponent } from './home/home.component';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { FuncionalidadesModule } from './funcionalidades/funcionalidades.module';
import { HttpClientModule } from '@angular/common/http';
=======
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RolesModule } from './roles/roles.module';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
>>>>>>> fb2587f (BackLog Terminado sin diseño)
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
>>>>>>> 3bf252e (Implementación de Toastr al backlog PBL-4)

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    LayoutsModule,
    ReactiveFormsModule,
    LoginModule,
    UsersModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    FuncionalidadesModule,// Adicionando el modulo de Funcionalidades
    HttpClientModule 
=======
    RolesModule,
    FormsModule,
<<<<<<< HEAD
    HttpClientModule
>>>>>>> fb2587f (BackLog Terminado sin diseño)
=======
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
>>>>>>> 3bf252e (Implementación de Toastr al backlog PBL-4)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
