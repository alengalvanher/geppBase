import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Componentes
import { RegistroComponent } from './registro/registro.component';
import { CargaComponent } from "./carga/carga.component";
import { ConsultaComponent } from './consulta/consulta.component';
import { DetalleComponent } from './consulta/detalle/detalle.component';


const routes: Routes = [
    { path: '', component: CargaComponent },
    { path: 'carga', component: CargaComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'consulta', component: ConsultaComponent },
    { path: 'detalle', component: DetalleComponent },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventarioRoutingModule { }
