import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CargadearchivosService } from "@servicios/carga/cargadearchivos.service";


@Component({
	selector: 'app-carga',
	templateUrl: './carga.component.html',
	styleUrls: ['./carga.component.scss']
})
export class CargaComponent {
	@ViewChild('successAlert') successAlert:any;
	@ViewChild('errorAlert') errorAlert:any;

	@ViewChild("fileUpload", { static: false }) fileUpload: ElementRef | undefined;
	files = [];
	myPreloader: boolean = false
	responseData:any


	cargaForm = new FormGroup({
		archivo: new FormControl(null)
	});

	constructor(
		private cargaDeArchivos: CargadearchivosService,
		private _ngbModal: NgbModal
		) {
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


	enviarArchivo(archivo:any) {
		const formData = new FormData();
		formData.append('file', archivo.data);
		archivo.inProgress = true;

		this.cargaDeArchivos.sendFormData(formData).subscribe({
			next: (response) => {
				console.log("Responses", response)

				if (response.Success == true) {
					this.myPreloader = false
					this.cargaForm.reset()
					this.responseData = response;
					this._ngbModal.open(this.successAlert, { centered: true, backdrop : 'static', keyboard : false });
				}
			},
			error: (error) => {
				console.log("error", error)

				this.myPreloader = false
				this._ngbModal.open(this.errorAlert, { centered: true, backdrop : 'static', keyboard : false });
			}
		});
	}

	modalDismiss(){
		this._ngbModal.dismissAll();
	}
}
