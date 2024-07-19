import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import { FormularioService } from '../../servicios/formulario.service';



@Component({
    selector: 'app-form-combustibles',
    templateUrl: './form-combustibles.component.html',
    styleUrls: ['./form-combustibles.component.scss']
})
export class FormCombustiblesComponent implements OnInit {
    @ViewChild('simpleAlert') simpleAlert:any;
	responseData:any;


    FuelTypesList:any;
    FuelSuppliersList:any;
    FuelDeviceTypesList:any;


    statusValues = [
        { value: 'Activa', viewValue: 'Activa' },
        { value: 'Inactiva', viewValue: 'Inactiva' }
    ];


    formFuelInformation = new FormGroup({
        Type: new FormControl('', Validators.required),
        Capacity: new FormControl(''),
        Supplier: new FormControl('', Validators.required),
        DeviceType: new FormControl('', Validators.required),
        DeviceId: new FormControl('', Validators.required),
        Status: new FormControl('', Validators.required),
        MonthlyPayment: new FormControl(''),
        FuelInsertDate: new FormControl('')
    })
    constructor(
        private _inventarioService: InventarioService,
        private _ngbModal: NgbModal
        ) {
        this._inventarioService.getCatalog('Fuel').subscribe(data => {

            this.FuelTypesList = data['FuelTypesList'];
            this.FuelSuppliersList = data['FuelSuppliersList'];
            this.FuelDeviceTypesList = data['FuelDeviceTypesList'];
        })

        // Comprueba si existe variable de edición y en caso de true carga el formulario correspondiente.
        if( localStorage.getItem('VehicleIdentifier') ) {
            this.getFormData( localStorage.getItem('VehicleIdentifier') )
        }
    }

    ngOnInit(): void {
    }


    sendForm() {
        // this._formularioService.setFormInformation(, "FuelInformation");
        // this.resetForm();
        let data = this.formFuelInformation.value
        let objetoTemporal = Object.assign({}, data);
		objetoTemporal.FuelInsertDate = this.convertDate(data.FuelInsertDate);

		let formInventary = {
            VehicleIdentifier: localStorage.getItem('VehicleIdentifier'),
            OperativeInformation: {
                FuelInformation: objetoTemporal
            }
        }



        this._inventarioService.sendInventoryForm(formInventary).subscribe(response => {
			console.log("Recibiendo formulario grande", response);
			this.responseData = response;
			this._ngbModal.open(this.simpleAlert, { centered: true, backdrop : 'static', keyboard : false });

			console.log("this.response", this.responseData);
		})
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

    resetForm() {
        this.formFuelInformation.patchValue({
            Type: '',
            Capacity: '',
            Supplier: '',
            DeviceType: '',
            DeviceId: '',
            Status: '',
            MonthlyPayment: '',
            FuelInsertDate: ''
        });
    }


    // Trae datos capturados previamente desde un servicio.
    getFormData(Identifier) {
        // console.log("Trayendo con el identifier", Identifier);
		console.log("GET IDENTIFIER", Identifier);

        this._inventarioService.getVehicleInformation(Identifier).subscribe(response => {
			console.log( "TRAYENDO RESPONSE COMBUSTGIBLEs", response);

			let objetoResponse = Object.assign({}, response.OperativeInformation.FuelInformation);
            objetoResponse.FuelInsertDate = this.convertFechaToDateForm( response.OperativeInformation.FuelInformation.FuelInsertDate );

            console.log("Voy  a parchar",  objetoResponse);
            this.formFuelInformation.patchValue( objetoResponse );
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


    modalDismiss(){
		this._ngbModal.dismissAll();
	}
}
