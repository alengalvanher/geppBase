import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';


@Component({
    selector: 'app-form-telemetria',
    templateUrl: './form-telemetria.component.html',
    styleUrls: ['./form-telemetria.component.scss']
})
export class FormTelemetriaComponent implements OnInit {
    @ViewChild('simpleAlert') simpleAlert:any;
	responseData:any;



    TelemetryDeviceTypesList:any;
    SupplierTelemetriesList:any;

    statusValues = [
        { value: 'Activa', viewValue: 'Activa' },
        { value: 'Inactiva', viewValue: 'Inactiva' }
    ];

    formTelemetryInformation = new FormGroup({
        Device: new FormControl(''),
        Supplier: new FormControl(''),
        InstalledDate: new FormControl(''),
        RemovedDate: new FormControl(''),
        Status: new FormControl('')
    })
    constructor(
        private _inventarioService: InventarioService,
        private _ngbModal: NgbModal,
    ) {
        this._inventarioService.getCatalog('Telemetry').subscribe(data => {
            this.SupplierTelemetriesList = data['SupplierTelemetriesList'];
            this.TelemetryDeviceTypesList = data['TelemetryDeviceTypesList'];
        })


        // Comprueba si existe variable de edición y en caso de true carga el formulario correspondiente.
        if( localStorage.getItem('VehicleIdentifier') ) {
            this.getFormData(localStorage.getItem('VehicleIdentifier'))
        }
    }

    ngOnInit(): void {
    }



    sendForm() {
        // this._formularioService.setFormInformation(, "TelemetryInformation");
        // this.resetForm();
        let data = this.formTelemetryInformation.value

        let objeto = data;
		objeto.InstalledDate = this.convertDate(data.InstalledDate);
		objeto.RemovedDate = this.convertDate(data.RemovedDate);

        let formInventary = {
            VehicleIdentifier: localStorage.getItem('VehicleIdentifier'),
            OperativeInformation: {
                TelemetryInformation: objeto
            }
        }

        this._inventarioService.sendInventoryForm( formInventary ).subscribe(response => {
			this.responseData = response;
			this._ngbModal.open(this.simpleAlert, { centered: true, backdrop : 'static', keyboard : false });
			console.log("this.response", this.responseData);
		});
    }


    resetForm() {
        this.formTelemetryInformation.patchValue({
            Device: '',
            Supplier: '',
            InstalledDate: '',
            RemovedDate: '',
            Status: ''
        });
    }


    // Trae datos capturados previamente desde un servicio.
    getFormData(Identifier) {

        this._inventarioService.getVehicleInformation(Identifier).subscribe(response => {
			let objetoResponse = Object.assign({}, response.OperativeInformation.TelemetryInformation)
            objetoResponse.InstalledDate = this.convertFechaToDateForm( response.OperativeInformation.TelemetryInformation.InstalledDate )
            objetoResponse.RemovedDate = this.convertFechaToDateForm( response.OperativeInformation.TelemetryInformation.RemovedDate )

            this.formTelemetryInformation.patchValue( objetoResponse );
		})

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
