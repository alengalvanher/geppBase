import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  localEs  from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common'

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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OrigamiElementsModule } from 'src/app/origami-elements/origami-elements.module';
import { FlotasElementsModule } from 'src/app/flotas-elements/fe-flotas-elements.module';


@NgModule({
  declarations: [
    ReportesComponent
  ],
  imports: [
    CommonModule,
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
  providers:[BrowserAnimationsModule, ,{provide: LOCALE_ID, useValue: 'es'}],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportesModule { }
