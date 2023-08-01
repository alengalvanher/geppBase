import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';


@Component({
    selector: 'app-form-aditamentos',
    templateUrl: './form-aditamentos.component.html',
    styleUrls: ['./form-aditamentos.component.scss']
})
export class FormAditamentosComponent implements OnInit {
    @ViewChild('simpleAlert') simpleAlert:any;
	responseData:any;


    ComplementsTypesList: any;
    formularioAditamentos: FormGroup;
    aditamentos:FormArray;



    constructor(
        private _inventarioService: InventarioService,
        private _formBuilder: FormBuilder,
        private _ngbModal: NgbModal
    ) {
        this._inventarioService.getCatalog('Complements').subscribe(data => {
            this.ComplementsTypesList = data['ComplementsTypesList'];
        })


        this.formularioAditamentos = this._formBuilder.group({
            aditamentos: new FormArray([
                // new FormGroup({
                //     Complement: new FormControl(''),
                //     Brand: new FormControl(''),
                //     Serie: new FormControl('')
                // })
            ])
        });


        // Comprueba si existe variable de edición y en caso de true carga el formulario correspondiente.
        if( localStorage.getItem('VehicleIdentifier') ) {
            this.getFormData( localStorage.getItem('VehicleIdentifier') )
        }
    }

    ngOnInit(): void {

    }



    addComplementToForm() {
        const complemento = this._formBuilder.group({
            Complement: new FormControl(''),
            Brand: new FormControl(''),
            Serie: new FormControl('')
        });

        this.complementItem.push(complemento);
    }


    addComplementToFormWithInfo(item) {
        const complemento = this._formBuilder.group({
            Complement: new FormControl(item.Complement),
            Brand: new FormControl(item.Brand),
            Serie: new FormControl(item.Serie)
        });

        this.complementItem.push(complemento);
    }



    get complementItem(): FormArray {
        return this.formularioAditamentos.get('aditamentos') as FormArray;
    }




    sendForm() {
        let data = this.formularioAditamentos.value

        let formInventary = {
            VehicleIdentifier: localStorage.getItem('VehicleIdentifier'),
            ComplementsInformation:{
                Complements: data.aditamentos
            }
        }

        this._inventarioService.sendInventoryForm( formInventary ).subscribe(response => {
			console.log("Recibiendo formulario grande", response);
			this.responseData = response;
			this._ngbModal.open(this.simpleAlert, { centered: true, backdrop : 'static', keyboard : false });

			console.log("this.response", this.responseData);
		});
    }


    resetForm() {
        // this.formularioAditamentos.patchValue({
        //     Quantity: '',
        //     CarWheelsInch: '',
        //     TireWidth: '',
        //     TireHeight: ''
        // });
    }


    // Trae datos capturados previamente desde un servicio.
    getFormData(Identifier) {
        // console.log("Trayendo con el identifier", Identifier);
		console.log("GET IDENTIFIER", Identifier);

        this._inventarioService.getVehicleInformation(Identifier).subscribe(response => {
			console.log( "TRAYENDO RESPONSE ADITAMENTOS", response.ComplementsInformation.Complements);

			let objetoResponse = Object.assign({}, response.ComplementsInformation.Complements);


            console.log("Voy  a parchar",  objetoResponse);
            // this.formularioAditamentos.patchValue( objetoResponse );

            response.ComplementsInformation.Complements.forEach(element => {
                this.addComplementToFormWithInfo(element);
            });

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
