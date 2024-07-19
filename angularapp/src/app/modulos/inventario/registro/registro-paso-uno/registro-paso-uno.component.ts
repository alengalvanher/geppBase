import { Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { FormularioService } from '../../servicios/formulario.service';


@Component({
    selector: 'app-registro-paso-uno',
    templateUrl: './registro-paso-uno.component.html',
    styleUrls: ['./registro-paso-uno.component.scss']
})
export class RegistroPasoUnoComponent {

    constructor(
        private _formularioService:FormularioService
    ) {
    }
}
