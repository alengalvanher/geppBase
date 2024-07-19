import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';


@Component({
    selector: 'app-form-casetas',
    templateUrl: './form-casetas.component.html',
    styleUrls: ['./form-casetas.component.scss']
})
export class FormCasetasComponent implements OnInit {
    @ViewChild('simpleAlert') simpleAlert: any;
    responseData: any;
    StandSupplierList: any;

    statusValues = [
        { value: 'Activa', viewValue: 'Activa' },
        { value: 'Inactiva', viewValue: 'Inactiva' }
    ];



    formStandInformation = new FormGroup({
        TagNumber: new FormControl(''),
        StandSupplier: new FormControl(''),
        TagStatus: new FormControl(''),
        Route: new FormControl(''),
        CreatedDate: new FormControl(''),
        DeletedDate: new FormControl('')
    })
    constructor(
        private _inventarioService: InventarioService,
        private _ngbModal: NgbModal
    ) {
        this._inventarioService.getCatalog('Stand').subscribe(data => {
            this.StandSupplierList = data['StandSupplierList'];
        })

    }

    ngOnInit(): void {

        if (localStorage.getItem('VehicleIdentifier')) {
            this.getFormData(localStorage.getItem('VehicleIdentifier'))
        }

    }

    sendForm() {
        let formInventary = this.returnObjectToSend()

        this._inventarioService.sendInventoryForm(formInventary).subscribe(response => {
            this.responseData = response;
            this._ngbModal.open(this.simpleAlert, { centered: true, backdrop: 'static', keyboard: false });
        })
    }

    // Retorna el objeto arreglado para envíar al servidor.
    returnObjectToSend(){
        let data = Object.assign({}, this.formStandInformation.value)
        let objeto = data

        console.log("OBJETO", objeto)


        objeto.CreatedDate = this.convertDate( this.formStandInformation.value.CreatedDate )
        objeto.DeletedDate = this.convertDate( this.formStandInformation.value.DeletedDate )


        // if (objeto.DeletedDate.hasOwnProperty('day')) {
        // }

        return {
            VehicleIdentifier: localStorage.getItem('VehicleIdentifier'),
            OperativeInformation: {
                StandInformation: objeto
            }
        }
    }


    resetForm() {
        this.formStandInformation.patchValue({
            TagNumber: '',
            StandSupplier: '',
            TagStatus: '',
            Route: '',
            CreatedDate: '',
            DeletedDate: null
        });
    }


    // Trae datos capturados previamente desde un servicio.
    getFormData(Identifier) {
        this._inventarioService.getVehicleInformation(Identifier).subscribe(response => {

            let objetoResponse = Object.assign({}, response.OperativeInformation.StandInformation);

            if(objetoResponse.CreatedDate) {
                objetoResponse.CreatedDate = this.convertToNgDate(response.OperativeInformation.StandInformation.CreatedDate)
            }

            if(objetoResponse.CreatedDate) {
                objetoResponse.DeletedDate = this.convertToNgDate(response.OperativeInformation.StandInformation.DeletedDate)
            }
            this.formStandInformation.patchValue(objetoResponse);
        });

    }




    convertToNgDate(fecha): NgbDateStruct | null {
        let delimitador = '-';

        if(fecha){
            const date = fecha.split(delimitador);

            return {
                year: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                day: parseInt(date[2], 10),
            }
        } else {
            return null;
        }
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


    modalDismiss() {
        this._ngbModal.dismissAll();
    }
}
