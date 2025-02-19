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

import { ListamuellesComponent } from './muelles/components/listamuelles/listamuelles.component';
import { FormmuellesComponent } from './muelles/components/formmuelles/formmuelles.component';
import { TransitosListComponent } from './transitos/components/transitos-list/transitos-list.component';
import { TransitosComponent } from './transitos/components/transitos/transitos.component';
import { TripulantesListComponent } from './transitos/components/tripulantes-list/tripulantes-list.component';
import { TripulantesComponent } from './transitos/components/tripulantes/tripulantes.component';

import { ReservaComponent } from './plazas/components/reservas/reservas.component';
import { ClientesListComponent } from './clientes/components/clientes-list/clientes-list.component';
import { ClienteComponent } from './clientes/components/cliente/cliente.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'logout', component: LogoutComponent, canActivate: [authGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  { path: "transitos-list", component: TransitosListComponent, canActivate: [authGuard] },
  { path: "transitos", component: TransitosComponent, canActivate: [authGuard] },
  { path: 'transitos/:embarcacion/:tipo', component: TransitosComponent, canActivate: [authGuard] },


  {
    path: 'users', component: UserListComponent,
    canActivate: [authGuard],
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
  { path: 'plazas/:tipo/:id', component: PlazaComponent, canActivate: [authGuard] },


  { path: 'creacion', component: InstalacionComponent, canActivate: [authGuard] },
  { path: 'creacion/:id_instalacion/:tipo', component: InstalacionComponent, canActivate: [authGuard] },
  { path: 'instalacion', component: listaInstalacionComponent, canActivate: [authGuard] },

  { path: 'muelles', component: ListamuellesComponent, canActivate: [authGuard] },
  { path: 'formmuelles', component: FormmuellesComponent, canActivate: [authGuard] },
  { path: 'formmuelles/:id/:tipo', component: FormmuellesComponent, canActivate: [authGuard] },


  { path: 'tripulantes', component: TripulantesListComponent, canActivate: [authGuard] },
  { path: 'tripulantes/:embarcacion', component: TripulantesListComponent, canActivate: [authGuard] },
  { path: 'tripulantes/:option/:numeroDocumento/:embarcacion', component: TripulantesComponent, canActivate: [authGuard] },


  { path: 'transito/:numeroEmbarcacion', component: TripulantesListComponent, canActivate: [authGuard] },
  { path: 'transito/:option/:numeroDocumento', component: TripulantesComponent, canActivate: [authGuard] },
  // { path: 'tripulantes/:option/:embarcacion', component: TripulantesComponent, canActivate: [authGuard] },
  { path: 'reservas', component: ReservaComponent, canActivate: [authGuard] },
  { path: 'reservas/:tipo/:id_reserva', component: ReservaComponent, canActivate: [authGuard] },


  {
    path: 'muelles', component: ListamuellesComponent, canActivate:
      [authGuard]
  },
  { path: 'formmuelles', component: FormmuellesComponent, canActivate: [authGuard] },
  { path: 'formmuelles/:id/:tipo', component: FormmuellesComponent, canActivate: [authGuard] },

  { path: 'clientes', component: ClientesListComponent, canActivate: [authGuard] },
  { path: 'clientes/:option/:nif', component: ClienteComponent, canActivate: [authGuard] },


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
