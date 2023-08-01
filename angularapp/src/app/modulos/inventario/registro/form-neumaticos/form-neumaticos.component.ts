import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import { FormularioService } from '../../servicios/formulario.service';



@Component({
    selector: 'app-form-neumaticos',
    templateUrl: './form-neumaticos.component.html',
    styleUrls: ['./form-neumaticos.component.scss']
})
export class FormNeumaticosComponent implements OnInit {
    @ViewChild('simpleAlert') simpleAlert:any;
    responseData:any;


    CarWheelsInchesList:any;
    VehicleIdentifier:String = null;

    formTireInformation:FormGroup;

    constructor(
        private _inventarioService: InventarioService,
        private _formBuilder:FormBuilder,
        private _ngbModal: NgbModal,
        ) {

        let body = {
            "VehicleTypeIdentifier": localStorage.getItem('VehicleTypeIdentifier')
        }

        console.log("Lo que mando", body)

        this._inventarioService.getCarWheelsByVehicleType(body).subscribe(data => {
            console.log("This", data);
            this.CarWheelsInchesList = data['CarWheelsInches'];
        });


        this.formTireInformation = this._formBuilder.group({
            tires: new FormArray([
                // new FormGroup({
                //     Quantity: new FormControl(''),
                //     CarWheelsInch: new FormControl(''),
                //     TireWidth: new FormControl(''),
                //     TireHeight: new FormControl('')
                // })
            ])
        })


        // Comprueba si existe variable de edición y en caso de true carga el formulario correspondiente.
        if( window.sessionStorage.getItem('user') ) {
            let Identifier = JSON.parse(window.sessionStorage.getItem('user'));

            console.log("El objeto user tiene", Identifier);

            this.getFormData(Identifier.VehicleIdentifier);
            this.VehicleIdentifier = Identifier;
        } else {
            console.log("No hay nada guardado");
            this.addTireToForm();
        }

    }

    ngOnInit(): void {
    }


    addTireToForm() {
        const tire = this._formBuilder.group({
            Quantity: new FormControl(''),
            CarWheelsInch: new FormControl(''),
            TireWidth: new FormControl(''),
            TireHeight: new FormControl('')
        });

        this.tireItem.push(tire);
    }


    addTireToFormWithInfo(item) {
        const tire = this._formBuilder.group({
            Quantity: new FormControl(item.Quantity),
            CarWheelsInch: new FormControl(item.CarWheelsInch),
            TireWidth: new FormControl(item.TireWidth),
            TireHeight: new FormControl(item.TireHeight)
        });

        this.tireItem.push(tire);
    }





    sendForm() {
        let data = this.formTireInformation.value

        let formInventary:any = {
            VehicleIdentifier: localStorage.getItem('VehicleIdentifier'),
            OperativeInformation:{
                TireInformation: data.tires
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
        this.formTireInformation.patchValue({
            Quantity: '',
            CarWheelsInch: '',
            TireWidth: '',
            TireHeight: ''
        });
    }


    // Trae datos capturados previamente desde un servicio.
    getFormData(Identifier) {

        this._inventarioService.getVehicleInformation(Identifier).subscribe(response => {
            console.log("Trayendo formDadta", response);

            response.CompanyInformation.VehicleIdentifier = Identifier;

            // this.setEco(response.CompanyInformation.Eco);
            this.formTireInformation.patchValue( response.OperativeInformation.TireInformation );

            response.OperativeInformation.TireInformation.forEach(element => {
                this.addTireToFormWithInfo(element);
            });
		});

    }







    // setEco(Eco) {
    //     let inventarioSession = JSON.parse( window.sessionStorage.getItem('user') );
    //     inventarioSession.Eco = Eco;
    //     let newInventarioSession = JSON.stringify(inventarioSession);
    //     window.sessionStorage.setItem('user', newInventarioSession);
    // }

    get tireItem(): FormArray {
        return this.formTireInformation.get('tires') as FormArray;
    }



    modalDismiss(){
		this._ngbModal.dismissAll();
	}

}
