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

import { ListaComponent as listaPlazasComponents } from './plazas/components/lista/lista.component';
import { PlazaComponent } from './plazas/components/plaza/plaza.component';

import { InstalacionComponent } from './instalacion/components/creacion/instalacion.component';
import { ListaComponent as listaInstalacionComponent } from './instalacion/components/lista/lista.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: 'logout', component: LogoutComponent, canActivate: [authGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },


  {
    path: 'users', component: UserListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users/:option/:username',
    component: UserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'roles', component: listaRoles,
    canActivate: [authGuard]
  },
  {
    path: 'formulario/:id', component: FormularioComponent,
    canActivate: [authGuard]
  },

  {
    path: 'funcionalidades', component: listaFuncionalidad,
    canActivate: [authGuard]
  },

  { path: 'listaPlazas', component: listaPlazasComponents, canActivate: [authGuard] },
  { path: 'plazas', component: PlazaComponent, canActivate: [authGuard] },
  { path: 'plazas/:tipo/:id_plaza_base', component: PlazaComponent, canActivate: [authGuard] },


  { path: 'creacion', component: InstalacionComponent, canActivate: [authGuard] },
  { path: 'creacion/:id_instalacion/:tipo', component: InstalacionComponent, canActivate: [authGuard] },
  { path: 'instalacion', component: listaInstalacionComponent, canActivate: [authGuard] },

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
