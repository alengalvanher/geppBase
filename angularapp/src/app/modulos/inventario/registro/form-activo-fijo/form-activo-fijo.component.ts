import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import { FormularioService } from '../../servicios/formulario.service';


@Component({
    selector: 'app-form-activo-fijo',
    templateUrl: './form-activo-fijo.component.html',
    styleUrls: ['./form-activo-fijo.component.scss']
})
export class FormActivoFijoComponent implements OnInit {
    @ViewChild('simpleAlert') simpleAlert:any;
	responseData:any;


    formActive = new FormGroup({
        Number: new FormControl('', Validators.required),
        ActiveInsertDate: new FormControl('', Validators.required),
        Depreciation: new FormControl('', Validators.required),
        DepreciationAmount: new FormControl('', Validators.required),
        MissingMonths: new FormControl('', Validators.required),
        BookValues: new FormControl('', Validators.required),
        InitialAmount: new FormControl('', Validators.required)
    })
    constructor(
        private _inventarioService: InventarioService,
        private _formularioService:FormularioService,
        private _ngbModal: NgbModal
    ) {

        // Comprueba si existe variable de edición y en caso de true carga el formulario correspondiente.
        if( localStorage.getItem('VehicleIdentifier') ) {
            this.getFormData( localStorage.getItem('VehicleIdentifier') );
        }

    }

    ngOnInit(): void {
    }


    sendForm() {
        // this._formularioService.setFormInformation(, "AssetInformation");
        let data = this.formActive.value
        let objeto = data;
		objeto.ActiveInsertDate = this.convertDate(data.ActiveInsertDate);

        let formInventary = {
            VehicleIdentifier: localStorage.getItem('VehicleIdentifier'),
            FinancialInformation: {
                AssetInformation: objeto
            }
        }

        this._inventarioService.sendInventoryForm(formInventary).subscribe(response => {
			this.responseData = response;
			this._ngbModal.open(this.simpleAlert, { centered: true, backdrop : 'static', keyboard : false });
		});

    }


    resetForm() {
        this.formActive.patchValue({
            Number: '',
            ActiveInsertDate: '',
            Depreciation: '',
            DepreciationAmount: '',
            MissingMonths: '',
            BookValues: '',
            InitialAmount: ''
        });
    }


    // Trae datos capturados previamente desde un servicio.
    getFormData(Identifier) {
        // console.log("Trayendo con el identifier", Identifier);
		console.log("GET IDENTIFIER", Identifier);

        this._inventarioService.getVehicleInformation(Identifier).subscribe(response => {
			console.log( "TRAYENDO RESPONSE CASETAS", response.FinancialInformation.AssetInformation);

			let objetoResponse = Object.assign({}, response.FinancialInformation.AssetInformation);
            objetoResponse.ActiveInsertDate = this.convertFechaToDateForm( response.FinancialInformation.AssetInformation.ActiveInsertDate );

            console.log("Voy  a parchar",  objetoResponse);
            this.formActive.patchValue( objetoResponse );
		});
    }



    convertFechaToDateForm(fecha):NgbDateStruct | null {
        let delimitador = '-';
        const date = fecha.split(delimitador);

        return {
            year: parseInt(date[0], 10),
            month: parseInt(date[1], 10),
            day: parseInt(date[2], 10),
        };
    }


    convertDate(date) {
        try {

            if( date['year'] != undefined ) {
                let year = date['year']
                let month = ('00'+date['month']).slice(-2)
                let day = ('00'+date['day']).slice(-2)
                return `${year}-${month}-${day}`
            }


        } catch (error) {
            return date
        }
    }

	modalDismiss(){
		this._ngbModal.dismissAll();
	}
}
