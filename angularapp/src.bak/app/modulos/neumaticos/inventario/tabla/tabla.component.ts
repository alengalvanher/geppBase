import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


export interface neumaticosData {
	Unidad: string;
	Medida: string;
	Fecha: string;
	Uno: number;
	Dos: number;
	Tres: number;
	Cuatro: number;
	Cinco: number;
	Seis: number;
	Siete: number;
	Ocho: number;
	Nueve: number;
	Diez: number;
	Once: number;
	Doce: number;
	Notas: string;
}

const ELEMENT_DATA: neumaticosData[] = [
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Fecha: "22/11/2022", Uno: 7, Dos: 7, Tres: 4, Cuatro: 3, Cinco: 7, Seis: 9, Siete: 9, Ocho: 9, Nueve: 9, Diez: 9, Once: 10, Doce: 10, Notas: "Revisar desgastes" },
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Fecha: "22/11/2022", Uno: 7, Dos: 7, Tres: 4, Cuatro: 3, Cinco: 7, Seis: 9, Siete: 3, Ocho: 3, Nueve: 9, Diez: 9, Once: 10, Doce: 10, Notas: "Revisar desgastes" },
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Fecha: "22/11/2022", Uno: 7, Dos: 7, Tres: 4, Cuatro: 3, Cinco: 7, Seis: 9, Siete: 9, Ocho: 9, Nueve: 2, Diez: 2, Once: 10, Doce: 10, Notas: "Revisar desgastes" },
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Fecha: "22/11/2022", Uno: 7, Dos: 7, Tres: 4, Cuatro: 3, Cinco: 7, Seis: 9, Siete: 9, Ocho: 9, Nueve: 9, Diez: 9, Once: 4, Doce: 4, Notas: "Revisar desgastes" },
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Fecha: "22/11/2022", Uno: 7, Dos: 7, Tres: 4, Cuatro: 3, Cinco: 7, Seis: 9, Siete: 3, Ocho: 3, Nueve: 9, Diez: 9, Once: 10, Doce: 10, Notas: "Revisar desgastes" },
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Fecha: "22/11/2022", Uno: 7, Dos: 7, Tres: 4, Cuatro: 3, Cinco: 7, Seis: 9, Siete: 9, Ocho: 9, Nueve: 2, Diez: 2, Once: 10, Doce: 10, Notas: "Revisar desgastes" },
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Fecha: "22/11/2022", Uno: 7, Dos: 7, Tres: 4, Cuatro: 3, Cinco: 7, Seis: 9, Siete: 9, Ocho: 9, Nueve: 9, Diez: 9, Once: 4, Doce: 4, Notas: "Revisar desgastes" },
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Fecha: "22/11/2022", Uno: 7, Dos: 7, Tres: 4, Cuatro: 3, Cinco: 7, Seis: 9, Siete: 9, Ocho: 9, Nueve: 9, Diez: 9, Once: 10, Doce: 10, Notas: "Revisar desgastes" },
];

@Component({
	selector: 'app-tabla',
	templateUrl: './tabla.component.html',
	styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	myPreloader: boolean = true;
	dataInventory!: any;

	// displayedColumns: string[] = ['Unidad', 'Medida', 'Fecha', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez', 'Once', 'Doce',    'Notas'];
	displayedColumns: string[] = ['Unidad', 'Medida', 'Fecha', 'D', 'T1', 'T2', 'T3', 'T4', 'T5', 'Notas'];
	dataSource = ELEMENT_DATA;


	tableDisplay = this._formBuilder.group({
		Unidad: true,
		Medida: true,
		Fecha: true,
		Uno: true,
		Dos: true,
		Tres: true,
		Cuatro: true,
		Cinco: true,
		Seis: true,
		Siete: true,
		Ocho: true,
		Nueve: true,
		Diez: true,
		Once: true,
		Doce: true,
		Notas: true
	});


	constructor(private _formBuilder: FormBuilder, private modalService: NgbModal) {
		let response = [{
			Unidad: "String",
			Medida: "String",
			Fecha: "String",
			Uno: 11,
			Dos: 11,
			Tres: 11,
			Cuatro: 11,
			Cinco: 11,
			Seis: 11,
			Siete: 11,
			Ocho: 11,
			Nueve: 11,
			Diez: 11,
			Once: 11,
			Doce: 11,
			Notas: "String"
		}];

		this.dataInventory = response;

		console.log("la data es: ", this.dataInventory);
	}


	BasicOpen(basicmodal:any) {
		this.modalService.open(basicmodal, { size: 'lg' });
	}

	BasicOpenDos(basicmodal:any) {
		this.modalService.open(basicmodal, { size: 'lg' });
	}

	ngOnInit(): void {
	}

}
