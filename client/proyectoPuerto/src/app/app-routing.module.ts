import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/components/login/login.component';
import { LogoutComponent } from './login/components/logout/logout.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },

  // { path: 'empleados', component: ListaComponent, canActivate: [loginGuard] },
  // {
  //   path: 'empleados/:tipo/:id',
  //   component: EmpleadoComponent,
  //   canActivate: [loginGuard, empleadoGuard],
  //   canDeactivate: [abandonarPaginaGuard],
  // },

  // Ruta por defecto (vacía) -> Redirigir a /welcome
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Ruta que no coincide con ninguna de las anteriores
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
