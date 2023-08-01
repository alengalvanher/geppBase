import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CargadearchivosService } from "./../../../servicios/carga/cargadearchivos.service";

interface selectInterface {
	value: string;
	viewValue: string;
}









@Component({
	selector: 'app-dispersion',
	templateUrl: './dispersion.component.html',
	styleUrls: ['./dispersion.component.scss']
})
export class DispersionComponent implements OnInit {


	// businessUnit: string | undefined | null = null;
	weeks: string | undefined | null = null;
	supply: string | undefined | null = null;

	topBarForm = new FormGroup({
		BusinessUnit: new FormControl(''),
		week: new FormControl(''),
		supply: new FormControl('')
	})


	fuelObject = [
		{
			title: "$1,260,000.00",
			subtitle: "60,000 LTS",
			semana: "SEM 40",
			semana_dos: "(23/12/2022 - 31/12/2022)",
			enlaces: [
				{ icono: "ic_ajuste-blue", texto: "Solicitar ajuste de dispersión", enlace: "#" },
				{ icono: "download-blue", texto: "Descargar", enlace: "#" }
			],
			imagen: "./../../../../assets/img/logos/gris-edenred.svg"
		},
		{
			title: "$1,260,000.00",
			subtitle: "60,000 LTS",
			semana: "SEM 40",
			semana_dos: "(23/12/2022 - 31/12/2022)",
			enlaces: [
				{ icono: "download-blue", texto: "Descargar", enlace: "#" }
			],
			imagen: "./../../../../assets/img/logos/gris-gosmo.svg"
		},
		{
			title: "$1,260,000.00",
			subtitle: "60,000 LTS",
			semana: "SEM 40",
			semana_dos: "(23/12/2022 - 31/12/2022)",
			enlaces: [
				{ icono: "download-blue", texto: "Descargar", enlace: "#" }
			],
			imagen: "./../../../../assets/img/logos/gris-gasngo.svg"
		}
	];



	unidades: selectInterface[] = [
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



	businessUnitSelectValues = [
		{ value: 'BEC', viewValue: 'BEC' },
		{ value: 'EDP', viewValue: 'EDP' },
		{ value: 'PET', viewValue: 'PET' }
	];

	weeksSelectValues = [
		{ value: '1', viewValue: '1' },
		{ value: '2', viewValue: '2' },
		{ value: '3', viewValue: '3' },
		{ value: '4', viewValue: '4' },
		{ value: '5', viewValue: '5' }
	];

	supplySelectValues = [
		{ value: 'Endered', viewValue: 'Endered' },
		{ value: 'Gosmo', viewValue: 'Gosmo' },
		{ value: 'Gasngo', viewValue: 'Gasngo' }
	];



	withSitio = [
		{ id: 1, name: 'Querétaro' },
		{ id: 2, name: 'Hidalgo' }
	];




	businessUnitList = this.businessUnitSelectValues[0].viewValue;


	withDataTest = [
		{
			id: 1,
			datatest1: 'Data test',
		},
		{
			id: 2,
			datatest1: 'Data test',
		}
	];

	withDataTest2 = [
		{
			id: 1,
			datatest1: 'Data test',
		},
		{
			id: 2,
			datatest1: 'Data test',
		}
	];

	withDataTest3 = [
		{
			id: 1,
			datatest1: 'Data test',
		},
		{
			id: 2,
			datatest1: 'Data test',
		}
	];


	withSitioList = this.withSitio[0].name;
	withDataTestList = this.withSitio[0].name;
	withDataTestList2 = this.withSitio[0].name;
	withDataTestList3 = this.withSitio[0].name;



	constructor(private modalService: NgbModal, private servicio: CargadearchivosService, private _formBuilder: FormBuilder) {
	}


	ngOnInit(): void {
	}
}
