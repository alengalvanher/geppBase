import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ConciliacionService } from '@servicios/combustibles/conciliacion.service'



interface SupplierSelectInterface {
	value: string;
	viewValue: string;
}

interface businessUnitSelectInterface {
	value: string;
	viewValue:string;
}

interface periodSelectInterface {
	value: string;
	viewValue: string;
}



@Component({
    selector: 'app-proveedores',
    templateUrl: './proveedores.component.html',
    styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
    arrayNumeroDeSemana:any = [];
    @ViewChild('alertMessage') alertMessage:any;
	@ViewChild('successAlert') successAlert:any;
	@ViewChild('missingModal') missingModal:any;
	@ViewChild("fileUpload", { static: false }) fileUpload: ElementRef | undefined;


	files = [];
	myPreloader: boolean = false;
	alert:boolean = false;  // Elemento necesario para las alertas 1 de 4
	dataAlert = {}; // Elemento necesario para las alertas 2 de 4

	responseMessage:any = '';
	MissingDataList:any;


    businessUnitSelectValues:any
    supplierSelectValues:any

    fuelConsumptionForm = new FormGroup({
        BusinessUnit: new FormControl('', Validators.required),
        Period: new FormControl('', Validators.required),
        Supplier: new FormControl('', Validators.required),
        File: new FormControl('', Validators.required)
    });


    constructor(
		private _conciliacionService: ConciliacionService,
		private _ngbModal: NgbModal
    ) {
        this.arrayNumeroDeSemana = this.traerNumeroSemanas();


		this._conciliacionService.getCatalogCbu().subscribe(responseCbu => {
			this.businessUnitSelectValues = responseCbu.CbuList
		})


		this._conciliacionService.getCatalogSupplier().subscribe(responseSupplier => {
			this.supplierSelectValues = responseSupplier.FuelSupplierList
		})
    }

    ngOnInit(): void {
    }



    enviarFormulario(confirmar?) {
		this.myPreloader = true;
		const fileUpload = this.fileUpload?.nativeElement;

		let archivo = {
			data: fileUpload.files[0],
			inProgress: false,
			progress: 0
		}

		this.enviarArchivo(archivo, confirmar);
	}


	enviarArchivo(archivo:any, confirmar?) {
		const formData = new FormData();
		formData.append('file', archivo.data);
		formData.set('BusinessUnit', this.fuelConsumptionForm.value.BusinessUnit);
		formData.set('Period', this.fuelConsumptionForm.value.Period);
		formData.set('Supplier', this.fuelConsumptionForm.value.Supplier);

		if(confirmar) {
			formData.set('UpdateInformation', 'true');
		} else {
			formData.set('UpdateInformation', 'false');
		}

		archivo.inProgress = true;

		this._conciliacionService.sendFormData(formData).subscribe({
			next: (response) => {
				console.log("RESPONSE", response);

				if (response.Success == true) {
					this.myPreloader = false;
					this._ngbModal.open(this.successAlert, { centered: true, backdrop : 'static', keyboard : false });
					this.borrarFormulario();

				} else if( response.error.Success == false) {

					if( response.error.MissingDataList == null ) {
						console.log(response.error)
						//this._ngbModal.open(this.alertMessage, { centered: true, backdrop : 'static', keyboard : false });
						this.responseMessage = response.error.Message;
						this.myPreloader = false;

					} else {
						this.MissingDataList = response.MissingDataList;

						console.log("Esto es el missing Data list", this.MissingDataList);

						this._ngbModal.open(this.missingModal, { centered: true, backdrop : 'static', keyboard : false });
						this.responseMessage = response.Message;
						this.myPreloader = false;
					}

				}

			},
			error: (error) => {
				this.myPreloader = false;
				console.log("Error", error.error);
				// this.abrirAlerta("error", "No se pudo cargar tu archivo \n Por favor inténtalo nuevamente");
				if( error.error.Success == false) {

					if( error.error.MissingDataList == null ) {
						
						//this._ngbModal.open(this.alertMessage, { centered: true, backdrop : 'static', keyboard : false });
						this.responseMessage = error.error.Message;
						this.myPreloader = false;

					} 

				}
			}
		});
	}

	borrarFormulario(){
		this.fuelConsumptionForm.patchValue({
			BusinessUnit: '',
			Period: '',
			Supplier: '',
			File: ''
        });
	}


	traerNumeroSemanas(){
		let fechaActual = new Date();
		let fechaInicial = new Date(fechaActual.getFullYear(), 0, 1);
		var days = Math.floor((Number(fechaActual) - Number(fechaInicial)) / (24 * 60 * 60 * 1000));
		var numeroDeSemana = Math.ceil(days / 7) + 1;
		let arrayNumeroDeSemana:periodSelectInterface[] = [];

		for(let i = 1; i < numeroDeSemana; i++) {
			let item:periodSelectInterface = {
				value: ("0" + i).slice(-2),
				viewValue: ("0" + i).slice(-2)
			};

			arrayNumeroDeSemana.push(item);
		}

		console.log("arrayNumeroDeSemana", arrayNumeroDeSemana)
		return arrayNumeroDeSemana;
	}



	confirmarReenvio(){

		this.enviarFormulario('true');
		this._ngbModal.dismissAll();

	}


	successConfirm() {
		this._ngbModal.dismissAll();
	}

	closeAlert(){
		this.responseMessage = ''
		console.log(this.responseMessage)
	}
}
