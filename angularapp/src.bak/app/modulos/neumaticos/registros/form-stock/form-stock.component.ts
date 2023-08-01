import { Component, OnInit } from '@angular/core';


interface Valores {
	value: string;
	viewValue: string;
}

@Component({
	selector: 'app-form-stock',
	templateUrl: './form-stock.component.html',
	styleUrls: ['./form-stock.component.scss']
})
export class FormStockComponent implements OnInit {

	unidades: Valores[] = [
		{ value: 'valor-1', viewValue: 'Valor 1' },
		{ value: 'valor-1', viewValue: 'Valor 2' },
		{ value: 'valor-2', viewValue: 'Valor 3' },
		{ value: 'valor-1', viewValue: 'Valor 1' },
		{ value: 'valor-1', viewValue: 'Valor 2' },
		{ value: 'valor-2', viewValue: 'Valor 3' },
		{ value: 'valor-1', viewValue: 'Valor 1' },
		{ value: 'valor-1', viewValue: 'Valor 2' },
		{ value: 'valor-2', viewValue: 'Valor 3' },
		{ value: 'valor-1', viewValue: 'Valor 1' },
		{ value: 'valor-1', viewValue: 'Valor 2' },
		{ value: 'valor-2', viewValue: 'Valor 3' },
	];


	constructor() { }

	ngOnInit(): void {
	}

}
