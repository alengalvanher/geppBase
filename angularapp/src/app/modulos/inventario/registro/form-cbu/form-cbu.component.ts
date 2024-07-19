import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from '../../servicios/formulario.service';

@Component({
    selector: 'app-form-cbu',
    templateUrl: './form-cbu.component.html',
    styleUrls: ['./form-cbu.component.scss']
})
export class FormCbuComponent {
    @Output() cbuChanged = new EventEmitter<any>();

    businessUnitSelectValues = [
        { Identifier: '5A2D6B29-0452-4A7D-B6A6-E2BF1EBEFB81', CbuName: 'BEC' },
        { Identifier: '8FD40165-1E1A-4BD1-B0E3-A7D920E63EEA', CbuName: 'EDP' },
        { Identifier: 'BBC4B119-C271-4339-B9E3-47C7F0A8C6CC', CbuName: 'PET' }
    ];

    formCbu = new FormGroup({
		BusinessUnit: new FormControl('', [Validators.required])
	});


    constructor(
        private _formularioService: FormularioService
    ) {}

    cbuChangedFunction(event){
        this._formularioService.setFormInformation(this.formCbu.value, "CBU");
        this.cbuChanged.emit(true);
    }
}
