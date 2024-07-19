import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';


@Component({
    selector: 'app-form-informacion-compania',
    templateUrl: './form-informacion-compania.component.html',
    styleUrls: ['./form-informacion-compania.component.scss']
})
export class FormInformacionCompaniaComponent {
    @ViewChild('simpleAlert') simpleAlert:any;
    responseData:any;

    // Catalogos obtenidos por servicio
    RegionList: any;
    AreaList: any;
    SubareaList: any;
    FactoryList: any;
    SiteList: any;
    CostCenterList: any;



    formCompanyInformation = new FormGroup({
        SapEco: new FormControl(''),
        Region: new FormControl(''),
        Area: new FormControl(''),
        Subarea: new FormControl(''),
        Factory: new FormControl(''),
        Site: new FormControl(''),
        CostCenter: new FormControl(''),
    });

    disabledFields:boolean = false;
    responseInformation: any = {}

    constructor(
        private _inventarioService: InventarioService,
        private _ngbModal: NgbModal,
    ) {

    }


    ngOnInit(){
        // Trae los catalogos
        this._inventarioService.getCatalog('Company').subscribe(data => {
            this.RegionList = data['RegionList'];
            this.AreaList = data['AreaList'];
            this.SubareaList = data['SubareaList'];
            this.FactoryList = data['FactoryList'];
            this.SiteList = data['SiteList'];
            this.CostCenterList = data['CostCenterList'];
        })



        // Llena el formulario si hay información
        if( localStorage.getItem('VehicleIdentifier') ){
            this.getFormData( localStorage.getItem('VehicleIdentifier') )
            
        }

        
    }

    sendForm() {
       
        let formInventary:any = {};
		formInventary.CompanyInformation = this.formCompanyInformation.value
        formInventary.VehicleIdentifier = localStorage.getItem('VehicleIdentifier')
		formInventary.CompanyInformation.Eco = localStorage.getItem('Eco')

        if( localStorage.getItem('Editando')  == 'true') {
            //Info de region y sitio para el payload deshabilitado
            if(this.responseInformation['Region'] !== null){
                formInventary.CompanyInformation.Region = this.responseInformation.Region
            }
            if( this.responseInformation.Site !== null){
                formInventary.CompanyInformation.Site = this.responseInformation.Site
            }
            
        }

		this._inventarioService.sendInventoryForm(formInventary).subscribe(response => {
			this.responseData = response;
			this._ngbModal.open(this.simpleAlert, { centered: true, backdrop : 'static', keyboard : false });
		});
    }



    resetForm() {
        this.formCompanyInformation.patchValue({
            SapEco: '',
            Region: '',
            Area: '',
            Subarea: '',
            Factory: '',
            Site: '',
            CostCenter: ''
        });
    }


    // Trae datos capturados previamente desde un servicio.
    getFormData(Identifier) {
        this._inventarioService.getVehicleInformation(Identifier).subscribe(response => {
            response.CompanyInformation.VehicleIdentifier = Identifier;
            this.patchValues(response.CompanyInformation)
            
            this.responseInformation = response.CompanyInformation
            
            //Deshabilita los selects de region y sitio para cuando están editando 
            if( localStorage.getItem('Editando')  == 'true') {
                    if(this.responseInformation['Region'] !== null){
                        console.log('inside')
                        this.formCompanyInformation.controls['Region'].disable();
                    }
                    if( this.responseInformation.Site !== null){
                        console.log('inside-2')
                        this.formCompanyInformation.controls['Site'].disable();
                    }
            } else if( localStorage.getItem('Editando')  == 'false') {
                this.disabledFields = false
                console.log(this.disabledFields)
            }
		});

    }
    //Filtro de CEDIS en cascada dependiendo de la región
    onBrandChange(RegionIdentifier) {
        console.log(RegionIdentifier.target.value)
        this.formCompanyInformation.controls.Site.enable();

        this._inventarioService.getSitesByRegion(RegionIdentifier.target.value).subscribe(RegionResponse => {

            console.log(RegionResponse);
            this.SiteList = RegionResponse.SitesList

        });
    }
    
    patchValues(values){
        let objectToPatch = {};

        for( const [key, value] of Object.entries(values) ) {
            if( value != null ) {
                objectToPatch[key] = value;
            }
        }

        this.formCompanyInformation.patchValue( objectToPatch );
    }


    modalDismiss(){
		this._ngbModal.dismissAll();
	}
}
