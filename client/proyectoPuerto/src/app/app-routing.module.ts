import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstalacionComponent } from './instalacion/components/creacion/instalacion.component';
import { ListaComponent } from './instalacion/components/lista/lista.component';

const routes: Routes = [
  //meter rutas
  { path: "creacion", component: InstalacionComponent },
  { path: "listado", component: ListaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
