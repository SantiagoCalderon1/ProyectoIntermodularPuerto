import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './roles/components/lista/lista.component';
import { FormularioComponent } from './roles/components/formulario/formulario.component';

const routes: Routes = [
  { path: 'roles', component: ListaComponent },
  { path: 'formulario/:id', component: FormularioComponent },
  { path: '', redirectTo: 'roles', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
