import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './plazas/components/lista/lista.component';

const routes: Routes = [

  // { path: 'empleados', component: ListaComponent, canActivate: [loginGuard] },
  { path: 'listaPlazas', component: ListaComponent },
  // {
  //   path: 'empleados/:tipo/:id',
  //   component: EmpleadoComponent,
  //   canActivate: [loginGuard, empleadoGuard],
  //   canDeactivate: [abandonarPaginaGuard],
  // },

  // Ruta por defecto (vacía) -> Redirigir a /welcome
  { path: '', redirectTo: '/listaPlazas', pathMatch: 'full' },
  // Ruta que no coincide con ninguna de las anteriores
  { path: '**', redirectTo: '/listaPlazas', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
