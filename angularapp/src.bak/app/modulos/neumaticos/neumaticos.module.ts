import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioComponent } from './inventario/inventario.component';
import { NeumaticosComponent } from './neumaticos.component';
import { EnUsoComponent } from "./en-uso/en-uso.component";


import { NeumaticosRoutingModule } from "./neumaticos-routing.module";

// origami Elements
import { OrigamiElementsModule } from "./../../origami-elements/origami-elements.module";
import { TarjetasComponent } from './inventario/tarjetas/tarjetas.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { TablaEspecialComponent } from './en-uso/tabla-especial/tabla-especial.component';

// Material
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";


import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

// Form
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Tabla2Component } from './inventario/tabla2/tabla2.component';
import { Tarjetas2Component } from './inventario/tarjetas2/tarjetas2.component';
import { RegistrosComponent } from './registros/registros.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormStockComponent } from './registros/form-stock/form-stock.component';
import { EnAlmacenComponent } from './en-almacen/en-almacen.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { RegistroComponent } from './registro/registro.component';


//Services
import { NeumaticosService } from "./../../servicios/neumaticos/neumaticos.service";
import { CambiarMilimetrajeComponent } from './en-uso/tabla-especial/cambiar-milimetraje/cambiar-milimetraje.component';
import { EditorNeumaticoIndividualComponent } from "./en-uso/tabla-especial/cambiar-milimetraje/editor-neumatico-individual/editor-neumatico-individual.component";
import { VerReporteComponent } from './en-uso/ver-reporte/ver-reporte.component';


@NgModule({
    declarations: [
        InventarioComponent,
        NeumaticosComponent,
        EnUsoComponent,
        TarjetasComponent,
        TablaEspecialComponent,
        Tabla2Component,
        Tarjetas2Component,
        RegistrosComponent,
        FormStockComponent,
        EnAlmacenComponent,
        SolicitudComponent,
        RegistroComponent,
        CambiarMilimetrajeComponent,
        EditorNeumaticoIndividualComponent,
        VerReporteComponent
    ],
    imports: [
        CommonModule,
        NeumaticosRoutingModule,
        OrigamiElementsModule,
        NgbModule,
        MatTableModule,
        MatMenuModule,
        MatButtonModule,
        MatPaginatorModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        HttpClientModule,
        HttpClientJsonpModule
    ],
    providers: [NeumaticosService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NeumaticosModule { }
