import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Material
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';


// Charts
import { NgxEchartsModule } from 'ngx-echarts';

// Componentes
import { BotonDescargarExcelComponent } from "./boton-descargar-excel/boton-descargar-excel.component";
import { GraficaDonutComponent } from './grafica-donut/grafica-donut.component';
import { GraficaBarComponent } from './grafica-bar/grafica-bar.component';
import { BotonPastillaComponent } from './boton-pastilla/boton-pastilla.component';
import { SelectPastillaComponent } from './select-pastilla/select-pastilla.component';


// CAMBIOS
import { IconblueComponent } from './iconblue/iconblue.component';
import { AlertComponent } from "./alert/alert.component";
import { TextoConNotificacionComponent } from './texto-con-notificacion/texto-con-notificacion.component';
import { FuelProvidersComponent } from './fuel-providers/fuel-providers.component';
import { FuelProvidersLargeComponent } from './fuel-providers-large/fuel-providers-large.component';
import { GestorDeColumnasComponent } from './gestor-de-columnas/gestor-de-columnas.component';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";



import { PageHeaderComponent } from './page-header/page-header.component';
import { TableHeaderElementComponent } from './table-header-element/table-header-element.component';
import { NumberCardComponent } from './number-card/number-card.component';
import { NumberCardFullComponent } from './number-card-full/number-card-full.component';
import { BloquearComponent } from './bloquear/bloquear.component';
import { TableFilterSearchComponent } from './table/table-filter-search/table-filter-search.component';
import { TableFilterColumnsComponent } from './table/table-filter-columns/table-filter-columns.component';
import { FilterByDateComponent } from './filters/filter-by-date/filter-by-date.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { MatIconModule } from "@angular/material/icon";
import { TableFilterPillsComponent } from './table/table-filter-pills/table-filter-pills.component';
import { PorcentajeComponent } from './porcentaje/porcentaje.component';
import { VehicleStatusComponent } from './vehicle-status/vehicle-status.component';






@NgModule({
  declarations: [
    BotonDescargarExcelComponent,
    GraficaDonutComponent,
    GraficaBarComponent,
    BotonPastillaComponent,
    SelectPastillaComponent,
    IconblueComponent,
    AlertComponent,
    TextoConNotificacionComponent,
    FuelProvidersComponent,
    FuelProvidersLargeComponent,
    GestorDeColumnasComponent,
    PageHeaderComponent,
    TableHeaderElementComponent,
    NumberCardComponent,
    BloquearComponent,
    NumberCardFullComponent,
    TableFilterSearchComponent,
    TableFilterColumnsComponent,
    FilterByDateComponent,
    TableFilterPillsComponent,
    PorcentajeComponent,
    VehicleStatusComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    NgxEchartsModule,
    NgbModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxEchartsModule.forChild(),
    MatFormFieldModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  exports:[
    BotonDescargarExcelComponent,
    GraficaDonutComponent,
    GraficaBarComponent,
    BotonDescargarExcelComponent,
    BotonPastillaComponent,
    SelectPastillaComponent,
    IconblueComponent,
    AlertComponent,
    TextoConNotificacionComponent,
    FuelProvidersComponent,
    FuelProvidersLargeComponent,
    GestorDeColumnasComponent,
    PageHeaderComponent,
    TableHeaderElementComponent,
    NumberCardComponent,
    BloquearComponent,
    NumberCardFullComponent,
    TableFilterSearchComponent,
    TableFilterColumnsComponent,
    FilterByDateComponent,
    TableFilterPillsComponent,
    PorcentajeComponent,
    VehicleStatusComponent
  ],
})
export class OrigamiElementsModule { }
