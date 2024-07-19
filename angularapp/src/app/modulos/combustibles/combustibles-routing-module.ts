import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CargasComponent } from './cargas/cargas.component';
import { DispersionComponent } from './dispersion/dispersion.component';
import { ConciliacionComponent } from './conciliacion/conciliacion.component';

const routes: Routes = [
  { path: 'carga', component: CargasComponent }, 
  { path: 'dispersion', component: DispersionComponent }, 
  { path: 'conciliacion', component: ConciliacionComponent }, 

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CombustiblesRoutingModule { }
