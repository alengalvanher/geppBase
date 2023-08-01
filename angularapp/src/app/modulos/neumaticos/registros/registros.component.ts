import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Valores {
	value: string;
	viewValue: string;
}


@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit {




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
