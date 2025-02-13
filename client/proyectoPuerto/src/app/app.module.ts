import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { RolesModule } from './roles/roles.module';
import { FormsModule } from '@angular/forms';
import { PlazasModule } from './plazas/plazas.module';
import { InstalacionModule } from './instalacion/instalacion.module';
import { MuellesModule } from './muelles/muelles.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    LoginModule,
    UsersModule,
    PlazasModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    FuncionalidadesModule,
    HttpClientModule ,
    RolesModule,
    FormsModule,
    InstalacionModule,
    MuellesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
