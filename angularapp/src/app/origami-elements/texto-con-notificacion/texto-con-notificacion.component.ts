import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-texto-con-notificacion',
	templateUrl: './texto-con-notificacion.component.html',
	styleUrls: ['./texto-con-notificacion.component.scss']
})
export class TextoConNotificacionComponent implements OnInit {
	@Input() 'texto':string;
	@Input() 'cantidad':number;
	@Input() 'modo':string;

	@Output() clickEmitter = new EventEmitter();
	
	constructor() { }

	ngOnInit(): void {
	}

}
