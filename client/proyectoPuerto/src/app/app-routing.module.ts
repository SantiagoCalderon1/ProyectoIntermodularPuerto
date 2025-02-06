import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './plazas/components/lista/lista.component';
import { PlazaComponent } from './plazas/components/plaza/plaza.component';

const routes: Routes = [
  { path: 'listaPlazas', component: ListaComponent },
  { path: 'plazas', component: PlazaComponent },
  { path: '', redirectTo: '/plazas', pathMatch: 'full' },
  { path: '**', redirectTo: '/plazas', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }