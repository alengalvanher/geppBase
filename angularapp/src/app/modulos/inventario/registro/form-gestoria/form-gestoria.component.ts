import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import { FormularioService } from '../../servicios/formulario.service';


@Component({
    selector: 'app-form-gestoria',
    templateUrl: './form-gestoria.component.html',
    styleUrls: ['./form-gestoria.component.scss']
})
export class FormGestoriaComponent implements OnInit {
    @ViewChild('simpleAlert') simpleAlert:any;
    CountriesList:any;
    LicenseTypesList:any;
    VehicleIdentifier:String = null;

    responseData:any;


    formInventary:any = {
		Cbu:null,
		Agency: null,
        CompanyInformation:null,
        OperativeInformation:{
            ManagementInformation: null,
            TireInformation: null,
            LeasingInformation: null,
            InsuranceInformation: null,
            StandInformation: null,
            FuelInformation: null,
            TelemetryInformation: null
        },
        FinancialInformation:{
            AssetInformation: null
        },
        ComplementsInformation:{
            Complements: null
        }
    };


    formManagementInformation = new FormGroup({
        Plate: new FormControl('', Validators.required),
        CirculationCard: new FormControl('', Validators.required),
        RegisterCountry: new FormControl('', Validators.required),
        LicenseType: new FormControl('', Validators.required),
        Tenencia1: new FormControl(''),
        Tenencia2: new FormControl(''),
        Tenencia3: new FormControl(''),
        Verificacion1: new FormControl(''),
        Verificacion2: new FormControl(''),
        Verificacion3: new FormControl(''),
        Permissions: new FormControl('')
    })
    constructor(
        private _inventarioService:InventarioService,
        private _ngbModal: NgbModal
        ) {
        this._inventarioService.getCatalog('Management').subscribe(data=>{
            this.CountriesList = data['CountriesList'];
            this.LicenseTypesList = data['LicenseTypesList'];
        });


        // Comprueba si existe variable de edición y en caso de true carga el formulario correspondiente.
        if( window.sessionStorage.getItem('user') ) {
            let Identifier = JSON.parse(window.sessionStorage.getItem('user'));
            this.getFormData(Identifier.VehicleIdentifier);
            this.VehicleIdentifier = Identifier;
        }
    }

    ngOnInit(): void {
    }


    sendForm() {
        this.formInventary.VehicleIdentifier = localStorage.getItem('VehicleIdentifier');
		this.formInventary.OperativeInformation.ManagementInformation = this.formManagementInformation.value;

		this.formInventary.OperativeInformation.ManagementInformation.Tenanty =  "Tenencia 2|Tenencia 3";
		this.formInventary.OperativeInformation.ManagementInformation.Verification = "1 semestre 2022|2 semestre 2022";

		this.sendBigForm();
    }


    resetForm() {
        this.formManagementInformation.patchValue({
            Plate: '',
            CirculationCard: '',
            RegisterCountry: '',
            LicenseType: '',
            Tenencia1: '',
            Tenencia2: '',
            Tenencia3: '',
            Verificacion1: '',
            Verificacion2: '',
            Verificacion3: '',
            Permissions: ''
        });
    }


    // Trae datos capturados previamente desde un servicio.
    getFormData(Identifier) {

        this._inventarioService.getVehicleInformation(Identifier).subscribe(response => {
            console.log("Trayendo formDadta", response);
            response.CompanyInformation.VehicleIdentifier = Identifier;
            this.setEco(response.CompanyInformation.Eco);

            this.formManagementInformation.patchValue(response.OperativeInformation.ManagementInformation);
		});

    }

    setEco(Eco) {
        console.log("Seteando Eco");
        let inventarioSession = JSON.parse( window.sessionStorage.getItem('user') );
        inventarioSession.Eco = Eco;
        let newInventarioSession = JSON.stringify(inventarioSession);
        window.sessionStorage.setItem('user', newInventarioSession);
    }



    sendBigForm(){

		this._inventarioService.sendInventoryForm(this.formInventary).subscribe(response => {
			console.log("Recibiendo formulario grande", response);
			this.responseData = response;
			this._ngbModal.open(this.simpleAlert, { centered: true, backdrop : 'static', keyboard : false });

			console.log("this.response", this.responseData);
		});
	}


    modalDismiss(){
		this._ngbModal.dismissAll();
	}
}
