import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombustiblesRoutingModule } from "./combustibles-routing-module";

import { CargasComponent } from './cargas/cargas.component';
import { ConciliacionComponent } from './conciliacion/conciliacion.component';
import { DispersionComponent } from './dispersion/dispersion.component';



// import { SharedModule } from './../../../../src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatPaginatorModule } from "@angular/material/paginator";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { CargadearchivosService } from "./../../servicios/carga/cargadearchivos.service";
import { ConciliacionService } from "./../../servicios/combustibles/conciliacion.service";

import { TablaDispersionComponent } from './dispersion/tabla/tabla.component';
import { BootstrapComponent } from './conciliacion/autorizar-conciliacion/bootstrap/bootstrap.component';
import { EstacionesComponent } from './cargas/estaciones/estaciones.component';
import { ProveedoresComponent } from './cargas/proveedores/proveedores.component';
import { DiscrepanciasComponent } from './conciliacion/discrepancias/discrepancias.component';

import { OrigamiElementsModule } from "../../origami-elements/origami-elements.module";
import { AutorizarConciliacionComponent } from './conciliacion/autorizar-conciliacion/autorizar-conciliacion.component';
import { DescargarConciliacionComponent } from './conciliacion/descargar-conciliacion/descargar-conciliacion.component';

@NgModule({
  declarations: [
    CargasComponent,
    ConciliacionComponent,
    DispersionComponent,
    TablaDispersionComponent,
    BootstrapComponent,
    EstacionesComponent,
    ProveedoresComponent,
    DiscrepanciasComponent,
    AutorizarConciliacionComponent,
    DescargarConciliacionComponent
  ],
  imports: [
    CommonModule,
    CombustiblesRoutingModule,
    MatStepperModule,
    NgSelectModule,
    NgbModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    HttpClientModule,
    HttpClientJsonpModule,
	ReactiveFormsModule,
    MatProgressBarModule,
    MatPaginatorModule,
    OrigamiElementsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[CargadearchivosService, ConciliacionService]
})
export class CombustiblesModule { }
