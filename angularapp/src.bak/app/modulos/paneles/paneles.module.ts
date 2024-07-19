import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PanelEnUsoDetalleComponent } from './panel-en-uso-detalle/panel-en-uso-detalle.component';
import { PanelEnUsoEdicionComponent } from './panel-en-uso-edicion/panel-en-uso-edicion.component';

import { InventariosConsultaHistoricosComponent } from './inventarios-consulta-historicos/inventarios-consulta-historicos.component';
import { InventarioDetalleComponent } from './inventario-detalle/inventario-detalle.component';
import { DetalleNeumaticoIndividualComponent } from "./panel-en-uso-detalle/detalle-neumatico-individual/detalle-neumatico-individual.component";
import { EditorNeumaticoIndividualComponent } from "./panel-en-uso-edicion/editor-neumatico-individual/editor-neumatico-individual.component";


import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

//Services
import { NeumaticosService } from "./../../servicios/neumaticos/neumaticos.service";
import { ImagenVehiculoComponent } from './panel-en-uso-detalle/imagen-vehiculo/imagen-vehiculo.component';
import { CuadroDeMedicionComponent } from './panel-en-uso-detalle/imagen-vehiculo/cuadro-de-medicion/cuadro-de-medicion.component';
import { PlantillaAutoComponent } from './panel-en-uso-detalle/imagen-vehiculo/plantilla-auto/plantilla-auto.component';
import { PlantillaCamionComponent } from './panel-en-uso-detalle/imagen-vehiculo/plantilla-camion/plantilla-camion.component';
import { OrigamiElementsModule } from 'src/app/origami-elements/origami-elements.module';
import { PlantillaMotocarroComponent } from './panel-en-uso-detalle/imagen-vehiculo/plantilla-motocarro/plantilla-motocarro.component';
import { PlantillaTractocamionComponent } from './panel-en-uso-detalle/imagen-vehiculo/plantilla-tractocamion/plantilla-tractocamion.component';



@NgModule({
    declarations: [
        PanelEnUsoDetalleComponent,
        PanelEnUsoEdicionComponent,
        InventariosConsultaHistoricosComponent,
        InventarioDetalleComponent,
        DetalleNeumaticoIndividualComponent,
        EditorNeumaticoIndividualComponent,
        ImagenVehiculoComponent,
        CuadroDeMedicionComponent,
        PlantillaAutoComponent,
        PlantillaCamionComponent,
        PlantillaMotocarroComponent,
        PlantillaTractocamionComponent,
    ],
    imports: [
        CommonModule,
        MatMenuModule,
        HttpClientModule,
        HttpClientJsonpModule,
        FormsModule,
        ReactiveFormsModule,
        OrigamiElementsModule
    ],
    exports: [
        PanelEnUsoDetalleComponent,
        PanelEnUsoEdicionComponent,
        InventariosConsultaHistoricosComponent,
        InventarioDetalleComponent,
        DetalleNeumaticoIndividualComponent,
        EditorNeumaticoIndividualComponent
    ],
    providers: [NeumaticosService]
})
export class PanelesModule { }
