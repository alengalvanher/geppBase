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
    totalTiresInput:number = 0
    MaxTires:any;
    CarWheelsInchesList:any;
    VehicleIdentifier:String = null;

    formTireInformation:FormGroup;

    constructor(
        private _inventarioService: InventarioService,
        private _formBuilder:FormBuilder,
        private _ngbModal: NgbModal,
        ) {


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
        if( localStorage.getItem('Editando') ) {
            let vehicleIdentifier = localStorage.getItem('VehicleIdentifier')
            this.getFormData(vehicleIdentifier)
            this.VehicleIdentifier = vehicleIdentifier
        } else {
            this.addTireToForm();
        }

    }

    ngOnInit(): void {
    }

    // ================================================================================================================
    // =========================================    FORMULARIO  =======================================================
    // ================================================================================================================
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

    resetForm() {
        this.formTireInformation.patchValue({
            Quantity: '',
            CarWheelsInch: '',
            TireWidth: '',
            TireHeight: ''
        });
    }



    // ================================================================================================================
    // =========================================    CONSUMO DE SERVICIOS  =============================================
    // ================================================================================================================
    // Trae las medidas de los rines
    getCarWheels(vehicleIdentifier){
        this._inventarioService.getCarWheelsByVehicleType({ "VehicleTypeIdentifier": vehicleIdentifier }).subscribe(data => {
            this.CarWheelsInchesList = data['CarWheelsInches']
            this.MaxTires = data['TireNumber']
        })
    }

    sendForm() {
        let data = this.formTireInformation.value
        let totalTiresInput:number = 0
        let formInventary:any = {
            VehicleIdentifier: localStorage.getItem('VehicleIdentifier'),
            OperativeInformation:{
                TireInformation: data.tires
            }
        }

        // data.tires.forEach(function (tireRow) {
        //     totalTiresInput += parseInt(tireRow.Quantity);
        // });

        this._inventarioService.sendInventoryForm( formInventary ).subscribe(response => {
			console.log("Recibiendo formulario grande", response);
			this.responseData = response;
			this._ngbModal.open(this.simpleAlert, { centered: true, backdrop : 'static', keyboard : false });

			console.log("this.response", this.responseData);
		});

    }

    // Trae datos capturados previamente desde un servicio.
    getFormData(Identifier) {

        this._inventarioService.getVehicleInformation(Identifier).subscribe(response => {
            console.log("Trayendo formDadta", response);

            this.getCarWheels( response.AgencyInformation.VehicleType )

            response.CompanyInformation.VehicleIdentifier = Identifier;

            // this.setEco(response.CompanyInformation.Eco);
            this.formTireInformation.patchValue( response.OperativeInformation.TireInformation );

            response.OperativeInformation.TireInformation.forEach(element => {
                this.addTireToFormWithInfo(element);
            });
		});

    }


    // ================================================================================================================
    // =========================================    FUNCIONES  ========================================================
    // ================================================================================================================
    getTotalTires(){
        let totalAux = 0;
        this.formTireInformation.value.tires.forEach(function (tireRow) {
            totalAux += parseInt(tireRow.Quantity)
        });
        console.log(totalAux)
        this.totalTiresInput = totalAux;
        console.log(this.MaxTires)
    }

    get tireItem(): FormArray {
        return this.formTireInformation.get('tires') as FormArray;
    }

    modalDismiss(){
		this._ngbModal.dismissAll();
	}
}
