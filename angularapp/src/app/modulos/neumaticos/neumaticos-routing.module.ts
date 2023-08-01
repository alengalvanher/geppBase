import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnUsoComponent } from "./en-uso/en-uso.component";
import { EnAlmacenComponent } from './en-almacen/en-almacen.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
    { path: 'registro', component: RegistroComponent },
    { path: 'en-uso', component: EnUsoComponent },
    { path: 'en-almacen', component: EnAlmacenComponent },
    { path: 'solicitud', component: SolicitudComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeumaticosRoutingModule { }
