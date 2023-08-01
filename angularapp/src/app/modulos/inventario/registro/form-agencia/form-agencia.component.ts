import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CargadearchivosService } from '@servicios/carga/cargadearchivos.service';

import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import { FormularioService } from '../../servicios/formulario.service';

@Component({
    selector: 'app-form-agencia',
    templateUrl: './form-agencia.component.html',
    styleUrls: ['./form-agencia.component.scss']
})
export class FormAgenciaComponent {
    @Output() 'responseSuccess' = new EventEmitter<boolean>;
    @ViewChild('successAlert') successAlert:any;

    @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef | undefined;

    YearList:any;
    BrandList:any;
    ModelList:any;
    isEditing:boolean = false;
    responseData:any;

    selectClicked:boolean = false;
    modelCounter = 0;

    // CATALOGOS
    VehicleTypeList: any;
    SubVehicleTypeList: any;
    // Identificador del vehículo
    VehicleIdentifier:String = null;


    // Declaración de formularios
    cargaForm = new FormGroup({
        archivo: new FormControl('')
    });

    formAgencyInformation = new FormGroup({
		Serie: new FormControl('', [Validators.required]),
		Brand: new FormControl('', [Validators.required]),
		Model: new FormControl({value: '', disabled: true}, [Validators.required]),
		Year: new FormControl('', [Validators.required]),
		PurchaseDate: new FormControl('', [Validators.required]),
		EngineSerie: new FormControl('', [Validators.required]),
        CylinderCapacity: new FormControl(''),
        VehicleType: new FormControl('', Validators.required),
        SubVehicleType: new FormControl('', Validators.required),
	});



    constructor(
        private _inventarioService: InventarioService,
        private _formularioService: FormularioService,
        private _ngbModal: NgbModal,
        private cargaDeArchivos: CargadearchivosService
    ) {

        // Carga los catalogos.
        this._inventarioService.getCatalog('Agency').subscribe(data => {
            this.YearList = data['YearList'];
            this.BrandList = data['BrandList'];
        })

        // Guarda el Identificador de Tipo de Vehículo.
        this.formAgencyInformation.controls.VehicleType.valueChanges.subscribe(data => {
            localStorage.setItem('VehicleTypeIdentifier', data)
        })


        // Trae los catalogos
        this._inventarioService.getCatalog('Company').subscribe(data => {
            this.VehicleTypeList = data['VehicleTypeList'];
            this.SubVehicleTypeList = data['SubVehicleTypeList'];
        })


        // Comprueba si existe variable de edición y en caso de true carga el formulario correspondiente.
        if( window.sessionStorage.getItem('user') ) {
            let Identifier = JSON.parse(window.sessionStorage.getItem('user'));
            this.getAgencyData(Identifier.VehicleIdentifier);

            this.isEditing = true;
            localStorage.setItem('Editando', 'false')
        } else {
            console.log("No hay nada guardado");
            
        }

        this.formAgencyInformation.get('Brand').valueChanges.subscribe(BrandIdentifier=>{
            this.onBrandChange(BrandIdentifier);
        })


        // this.formAgencyInformation.get('Serie').disable()
        // this.formAgencyInformation.get('EngineSerie').disable()
    }


    selectClickedFunction(){
        this.selectClicked = true;
    }


    //CARGA DE FACTURA
	sendInvoice() {
		console.log("Enviando factura");
	}


    onBrandChange(BrandIdentifier) {
        this.formAgencyInformation.controls.Model.enable();

        this._inventarioService.getModelsByBrand(BrandIdentifier).subscribe(ModelResponse => {

            console.log("this.isEditing", this.isEditing, (this.modelCounter !=1), (this.isEditing && this.modelCounter != 1));

            if(this.isEditing) {
                if(this.modelCounter != 1) {
                    this.ModelList = ModelResponse['ModelList'];
                    console.log("Is editing", this.modelCounter);
                }
            } else {
                this.ModelList = ModelResponse['ModelList'];
            }

            this.modelCounter++;

        });
    }


    // Trae datos capturados previamente desde un servicio.
    getAgencyData(Identifier) {

        this._inventarioService.getVehicleInformation(Identifier).subscribe(response => {

            let fecha = response.AgencyInformation.PurchaseDate;
            let fechaConvertida = this.convertFechaToDateForm( fecha );
            response.AgencyInformation.PurchaseDate = fechaConvertida;


            this.onBrandChange(response.AgencyInformation.Brand);
            this.formAgencyInformation.patchValue(response.AgencyInformation);
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

    resetForm(){
        this.formAgencyInformation.patchValue({
            Serie: '',
            Brand: '',
            Model: '',
            Year: '',
            PurchaseDate: '',
            EngineSerie: '',
            CylinderCapacity: ''
        });
    }

    sendForm(){
        
        // this._formularioService.setFormInformation(this.formAgencyInformation.value, 'Agency');

        let data = this.formAgencyInformation.value;
        console.log("Seteando Agency");

		let objetoTemporal = Object.assign({}, data);

		let PurchaseDate = this.convertDate(data.PurchaseDate)
		objetoTemporal['BusinessUnit'] = localStorage.getItem('cbu');
		objetoTemporal.PurchaseDate = PurchaseDate;

		console.log("Hasta aqui objeto temporal", objetoTemporal)

		this.sendAgencyAndGetEco(objetoTemporal);
    }


    sendAgencyAndGetEco(data){
		console.log("ENvio esto en agencia: ", data);
		this._inventarioService.SetAgencyInformation(data).subscribe(response => {
			console.log("Response Agencia", response);

			if( response.Success = true) {

				localStorage.setItem('Eco', response.Eco)
				localStorage.setItem('VehicleIdentifier', response.VehicleIdentifier)

				this.responseData = response;
				this._ngbModal.open(this.successAlert, { centered: true, backdrop : 'static', keyboard : false });
                this.responseSuccess.emit(true);
			}
        });
	}

    successConfirm() {
		this._ngbModal.dismissAll();
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



    prepararArchivo() {
		// this.myPreloader = true;

		const fileUpload = this.fileUpload?.nativeElement;

		let archivo = {
			data: fileUpload.files[0],
			inProgress: false,
			progress: 0
		}

		this.enviarArchivo(archivo);
	}



    enviarArchivo(archivo:any) {
        console.log("Enviando archivo")

		const formData = new FormData();
		formData.append('file', archivo.data);
        formData.append('section', 'Agency');

		archivo.inProgress = true;

		this.cargaDeArchivos.getFacturaData(formData).subscribe({
			next: (response) => {
				console.log("Responses", response)


                if( response.Serie != null ) {
                    this.formAgencyInformation.get('Serie').setValue(response.Serie)
                    this.formAgencyInformation.get('Serie').enable()
                } else {
                    this.formAgencyInformation.get('Serie').enable()
                }

                if( response.EngineSerie != null ) {
                    this.formAgencyInformation.get('EngineSerie').setValue(response.EngineSerie)
                } else {
                    this.formAgencyInformation.get('EngineSerie').enable()
                }

				if (response.Success == true) {


                    console.log("Se cargó correctamente", response)
                    // this.myPreloader = false
					// this.cargaForm.reset()
					// this.responseData = response;
					// this._ngbModal.open(this.successAlert, { centered: true, backdrop : 'static', keyboard : false });
				} else {
                    console.log("Success false", response)
                }
			},
			error: (error) => {
				console.log("error", error)

				// this.myPreloader = false
				// this._ngbModal.open(this.errorAlert, { centered: true, backdrop : 'static', keyboard : false });
			}
		});
	}
}
