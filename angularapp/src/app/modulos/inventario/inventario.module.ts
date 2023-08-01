import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  localEs  from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common'

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioComponent } from './inventario.component';

// import { SharedModule } from './../../../../src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";



import { RegistroComponent } from './registro/registro.component';
import { CargaComponent } from './carga/carga.component';
import { ConsultaComponent } from './consulta/consulta.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { FormGestoriaComponent } from './registro/form-gestoria/form-gestoria.component';
import { FormNeumaticosComponent } from './registro/form-neumaticos/form-neumaticos.component';
import { FormSegurosComponent } from './registro/form-seguros/form-seguros.component';
import { FormCasetasComponent } from './registro/form-casetas/form-casetas.component';
import { FormCombustiblesComponent } from './registro/form-combustibles/form-combustibles.component';
import { FormTelemetriaComponent } from './registro/form-telemetria/form-telemetria.component';
import { FormLeasingComponent } from './registro/form-leasing/form-leasing.component';
import { FormActivoFijoComponent } from './registro/form-activo-fijo/form-activo-fijo.component';
import { FormInformacionCompaniaComponent } from './registro/form-informacion-compania/form-informacion-compania.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { CargadearchivosService } from "./../../servicios/carga/cargadearchivos.service";
import { DetalleComponent } from './consulta/detalle/detalle.component';
import { RouterModule } from '@angular/router';

import { OrigamiElementsModule } from "./../../origami-elements/origami-elements.module";
import { FlotasElementsModule } from "../../flotas-elements/fe-flotas-elements.module";

import { FormAditamentosComponent } from './registro/form-aditamentos/form-aditamentos.component';


import { InventarioService } from "./../../servicios/inventario/inventario.service";
import { FormAgenciaComponent } from './registro/form-agencia/form-agencia.component';
import { PasoUnoComponent } from './registro/paso-uno/paso-uno.component';
import { PasoDosComponent } from './registro/paso-dos/paso-dos.component';
import { PasoTresComponent } from './registro/paso-tres/paso-tres.component';
import { PasoCuatroComponent } from './registro/paso-cuatro/paso-cuatro.component';
import { PruebaComponent } from './registro/form-activo-fijo/prueba/prueba.component';
import { RegistroPasoUnoComponent } from './registro/registro-paso-uno/registro-paso-uno.component';
import { RegistroPasoDosComponent } from './registro/registro-paso-dos/registro-paso-dos.component';
import { FormCbuComponent } from './registro/form-cbu/form-cbu.component';
import { SubstatusComponent } from './consulta/substatus/substatus.component';
import { TraspasoUnidadComponent } from './consulta/traspaso-unidad/traspaso-unidad.component';
import { CambioStatusComponent } from './consulta/cambio-status/cambio-status.component';
import { HistoricoComponent } from './consulta/historico/historico.component';
import { BotonStatusComponent } from './consulta/boton-status/boton-status.component';

registerLocaleData(localEs,'es');


@NgModule({
  declarations: [
    InventarioComponent,
    RegistroComponent,
    CargaComponent,
    ConsultaComponent,
    FormGestoriaComponent,
    FormNeumaticosComponent,
    FormSegurosComponent,
    FormCasetasComponent,
    FormCombustiblesComponent,
    FormTelemetriaComponent,
    FormLeasingComponent,
    FormActivoFijoComponent,
    FormInformacionCompaniaComponent,
    DetalleComponent,
    FormAditamentosComponent,
    FormAgenciaComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoCuatroComponent,
    PruebaComponent,
    RegistroPasoUnoComponent,
    RegistroPasoDosComponent,
    FormCbuComponent,
    SubstatusComponent,
    TraspasoUnidadComponent,
    CambioStatusComponent,
    HistoricoComponent,
    BotonStatusComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    // SharedModule,
    NgSelectModule,
    NgbModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatCheckboxModule,
    HttpClientJsonpModule,
    RouterModule,
    OrigamiElementsModule,
    FlotasElementsModule
  ],
  providers:[CargadearchivosService, BrowserAnimationsModule, InventarioService,{provide: LOCALE_ID, useValue: 'es'}],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class InventarioModule { }
