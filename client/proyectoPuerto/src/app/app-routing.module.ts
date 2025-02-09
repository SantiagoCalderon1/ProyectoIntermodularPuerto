import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstalacionComponent } from './instalacion/components/creacion/instalacion.component';
import { ListaComponent as instalacionListaComponent } from './instalacion/components/lista/lista.component';

const routes: Routes = [
  //meter rutas
  { path: 'creacion', component: InstalacionComponent },
  { path: 'creacion/:id_instalacion/:tipo', component: InstalacionComponent },
  { path: 'listado', component: instalacionListaComponent },
  { path: '', redirectTo: 'listado', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }