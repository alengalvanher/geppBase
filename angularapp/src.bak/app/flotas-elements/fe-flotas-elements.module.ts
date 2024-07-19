import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Material
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Componentes
import { FeImagenVehiculoComponent } from './fe-imagen-vehiculo/fe-imagen-vehiculo.component';
import { PlantillaAutoComponent } from './fe-imagen-vehiculo/fe-plantilla-auto/plantilla-auto.component'
import { CuadroDeMedicionComponent } from './fe-imagen-vehiculo/fe-cuadro-de-medicion/cuadro-de-medicion.component'
import { PlantillaCamionComponent } from './fe-imagen-vehiculo/fe-plantilla-camion/plantilla-camion.component'


@NgModule({
  declarations: [
    FeImagenVehiculoComponent,
    CuadroDeMedicionComponent,
    PlantillaAutoComponent,
    PlantillaCamionComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    FeImagenVehiculoComponent,
    CuadroDeMedicionComponent,
    PlantillaAutoComponent,
    PlantillaCamionComponent,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class FlotasElementsModule { }
