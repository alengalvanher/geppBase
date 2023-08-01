import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import { CargadearchivosService } from "./../../../../servicios/carga/cargadearchivos.service";



@Component({
	selector: 'app-form-seguros',
	templateUrl: './form-seguros.component.html',
	styleUrls: ['./form-seguros.component.scss']
})
export class FormSegurosComponent {
	@ViewChild('simpleAlert') simpleAlert:any;
	responseData:any;


	@ViewChild("fileUpload", { static: false }) fileUpload: ElementRef | undefined;
	files = [];
	myPreloader: boolean = false;
	alert: boolean = false;  // Elemento necesario para las alertas 1 de 4
	dataAlert = {}; // Elemento necesario para las alertas 2 de 4

	InsuranceList:any;


	cargaForm = new FormGroup({
		archivo: new FormControl('')
	});



	formInsuranceInformation = new FormGroup({
		Policy: new FormControl('', Validators.required),
		Hedge: new FormControl('', Validators.required),
		Insurance: new FormControl('', Validators.required),
		InsuranceInsertedDate: new FormControl('', Validators.required),
		Validity: new FormControl('', Validators.required),
		Deductible: new FormControl(''),
		NetPremium: new FormControl(''),
		Phone: new FormControl(''),
		Beneficiary: new FormControl(''),
		Endorsement: new FormControl('', Validators.required),
		Subtotal: new FormControl(''),
		Duty: new FormControl('')
	})
	constructor(
		private cargaDeArchivos: CargadearchivosService,
		private _inventarioService: InventarioService,
		private _ngbModal: NgbModal
		) {


			this._inventarioService.getCatalog('Insurance').subscribe(data => {
				console.log("La data es: ", data);
				this.InsuranceList = data['InsuranceList'];
			})


		}

	ngOnInit(){

		if( localStorage.getItem('VehicleIdentifier') ) {
			this.getFormData( localStorage.getItem('VehicleIdentifier') )
		}

	}



	enviarFormulario() {
		this.myPreloader = true;
		const fileUpload = this.fileUpload?.nativeElement;

		let archivo = {
			data: fileUpload.files[0],
			inProgress: false,
			progress: 0
		}

		this.enviarArchivo(archivo);
	}


	// enviarArchivo(archivo: any) {
	// 	const formData = new FormData();
	// 	formData.append('file', archivo.data);
	// 	archivo.inProgress = true;

	// 	this.cargaDeArchivos.sendFormData(formData).subscribe({
	// 		next: (response) => {
	// 			if (response.Success == true) {
	// 				this.myPreloader = false;
	// 				this.abrirAlerta("success", "Tu archivo se ha cargado con éxito", "Gracias");
	// 				this.cargaForm.reset();
	// 			}
	// 		},
	// 		error: (error) => {
	// 			this.myPreloader = false;
	// 			this.abrirAlerta("error", "No se pudo cargar tu archivo \n Por favor inténtalo nuevamente");
	// 		}
	// 	});
	// }


	// Elemento necesario para las alertas 4 de 4
	abrirAlerta(typeInput: any, subtitleInput: any, titleInput?: any) {
		this.dataAlert = {
			type: typeInput,
			title: titleInput,
			subtitle: subtitleInput
		}

		this.alert = true;
	}


	// Elemento necesario para las alertas 3 de 4
	revisarCerrado(event: any) {
		this.alert = !event;
	}


	sendForm() {
		let data = this.formInsuranceInformation.value
        let objetoTemporal = Object.assign({}, data)

		objetoTemporal.InsuranceInsertedDate = this.convertDate(data.InsuranceInsertedDate);
		objetoTemporal.Validity = this.convertDate(data.Validity);

		let formInventary = {
			VehicleIdentifier: localStorage.getItem('VehicleIdentifier'),
			OperativeInformation: {
				InsuranceInformation: objetoTemporal
			}
		}

		this._inventarioService.sendInventoryForm(formInventary).subscribe(response => {
			this.responseData = response;
			this._ngbModal.open(this.simpleAlert, { centered: true, backdrop : 'static', keyboard : false });
		});


    }


    resetForm() {
        this.formInsuranceInformation.patchValue({
            Policy: '',
			Hedge: '',
			Insurance: '',
			Validity: '',
			Deductible: '',
			NetPremium: '',
			Phone: '',
			Beneficiary: '',
			InsuranceInsertedDate: '',
			Endorsement: '',
			Subtotal: '',
			Duty: ''
        });
    }


	// Trae datos capturados previamente desde un servicio.
    getFormData(Identifier) {
        this._inventarioService.getVehicleInformation(Identifier).subscribe(response => {
			console.log( "TRAYENDO RESPONSE SEGUROS", response.OperativeInformation.InsuranceInformation);

			let objetoResponse = Object.assign({}, response.OperativeInformation.InsuranceInformation);
            objetoResponse.InsuranceInsertedDate = this.convertFechaToDateForm( response.OperativeInformation.InsuranceInformation.InsuranceInsertedDate );
			objetoResponse.Validity = this.convertFechaToDateForm( response.OperativeInformation.InsuranceInformation.Validity );

            this.formInsuranceInformation.patchValue( objetoResponse );
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
        formData.append('section', 'Insurance');

		archivo.inProgress = true;

		this.cargaDeArchivos.getFacturaData(formData).subscribe({
			next: (response) => {
				console.log("Responses", response)


                if( response.Policy != null ) {
                    this.formInsuranceInformation.get('Policy').setValue(response.Policy)
                } else {
                    this.formInsuranceInformation.get('Policy').enable()
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
