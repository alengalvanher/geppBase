import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

    @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef | undefined;
	files = [];
	myPreloader: boolean = false;
	alert:boolean = false;  // Elemento necesario para las alertas 1 de 4
	dataAlert = {}; // Elemento necesario para las alertas 2 de 4

	cargaForm = new FormGroup({
		archivo: new FormControl(null)
	});

	constructor() {
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
	}


	 // Elemento necesario para las alertas 4 de 4
	abrirAlerta(typeInput:any, subtitleInput:any, titleInput?:any){
		this.dataAlert = {
			type: typeInput,
			title: titleInput,
			subtitle: subtitleInput
		}

		this.alert = true;
	}


	// Elemento necesario para las alertas 3 de 4
	revisarCerrado(event:any){
		this.alert = !event;
	}

}
