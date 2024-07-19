import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-number-card-full',
	templateUrl: './number-card-full.component.html',
	styleUrls: ['./number-card-full.component.scss']
})
export class NumberCardFullComponent {
	@Input() numberoUno:any
	@Input() numberoDos:any
	@Input() miniModalData:any
	position:any = 1
	modalCoordinates:any = {
		x: '0px',
		y: '0px'
	}
	showModalValue:boolean = false

	color:string = '';

	colors = [
		"danger", "danger", "danger", "danger",
		"warning", "warning",
		"success", "success", "success", "success", "success", "success", "success", "success", "success", "success"
	]

	constructor() {
	}

	// Muestra la modal.
	showModal(e){
		// Seteamos las coordenadas de la modal.
		this.modalCoordinates = {
			x: `${e.clientX - 262}px`,
			y: `${e.clientY - 30}px`
		}

		// Mostramos la modal.
		this.showModalValue = true

		console.log(this.miniModalData)
	}

	// Esconde la modal.
	hideModal(){
		this.showModalValue = false
	}
}
