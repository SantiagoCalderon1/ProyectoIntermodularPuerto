import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/components/login/login.component';
import { LogoutComponent } from './login/components/logout/logout.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { UserListComponent } from './users/components/user-list/user-list.component';
import { UserComponent } from './users/components/user/user.component';
import { ListaComponent as listaRoles } from './roles/components/lista/lista.component';
import { ListaComponent as listaFuncionalidad } from './funcionalidades/components/lista/lista.component';

import { FormularioComponent } from './roles/components/formulario/formulario.component';

import { ListaComponent as listaPlazasComponents} from './plazas/components/lista/lista.component';
import { PlazaComponent } from './plazas/components/plaza/plaza.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [authGuard],
    data: { allowedRoles: ['administrador', 'gerencia_puerto', 'policia_aduanas', 'guarda_muelles'] }
  },


  {
    path: 'users', component: UserListComponent,
    // canActivate: [authGuard],
    data: { allowedRoles: ['administrador', 'gerencia_puerto'] }
  },
  {
    path: 'users/:option/:username',
    component: UserComponent,
    // canActivate: [authGuard],
    data: { allowedRoles: ['administrador', 'gerencia_puerto'] }
    // canDeactivate: [abandonarPaginaGuard],
  },
  {
    path: 'roles', component: listaRoles,
    // canActivate: [authGuard],
    data: { allowedRoles: ['administrador', 'gerencia_puerto'] }
  },
  {
    path: 'formulario/:id', component: FormularioComponent,
    // canActivate: [authGuard], 
    data: { allowedRoles: ['administrador', 'gerencia_puerto'] }
  },

  {
    path: 'funcionalidades', component: listaFuncionalidad,
    // canActivate: [authGuard], 
    data: { allowedRoles: ['administrador', 'gerencia_puerto'] }
  },

  { path: 'listaPlazas', component: listaPlazasComponents },
  { path: 'plazas', component: PlazaComponent },
  { path: 'plazas/:tipo/:id', component: PlazaComponent,},
  // { path: 'empleados', component: ListaComponent, canActivate: [loginGuard] },
  // {
  //   path: 'empleados/:tipo/:id',
  //   component: EmpleadoComponent,
  //   canActivate: [loginGuard, empleadoGuard],
  //   canDeactivate: [abandonarPaginaGuard],
  // },

  // Ruta por defecto (vacía) -> Redirigir a /login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Ruta que no coincide con ninguna de las anteriores
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
