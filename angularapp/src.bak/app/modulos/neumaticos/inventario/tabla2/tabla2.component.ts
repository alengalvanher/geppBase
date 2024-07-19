import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface neumaticosData2 {
	Unidad: string;
	Medida: string;
	Marca: string;
	Dot: string;
	Design: string;
	Velocidad: string;
	Mm: string;
	Status: string;
}

const ELEMENT_DATA2: neumaticosData2[] = [
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Marca: "Pirelli", Dot: "DT112341", Design: "Multiradio", Velocidad: "200 km/hr", Mm: "15", Status: "Nuevo"},
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Marca: "Pirelli", Dot: "DT112341", Design: "Multiradio", Velocidad: "200 km/hr", Mm: "15", Status: "Usado"},
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Marca: "Pirelli", Dot: "DT112341", Design: "Multiradio", Velocidad: "200 km/hr", Mm: "15", Status: "Nuevo"},
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Marca: "Pirelli", Dot: "DT112341", Design: "Multiradio", Velocidad: "200 km/hr", Mm: "15", Status: "Nuevo"},
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Marca: "Pirelli", Dot: "DT112341", Design: "Multiradio", Velocidad: "200 km/hr", Mm: "15", Status: "Nuevo"},
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Marca: "Pirelli", Dot: "DT112341", Design: "Multiradio", Velocidad: "200 km/hr", Mm: "15", Status: "Usado"},
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Marca: "Pirelli", Dot: "DT112341", Design: "Multiradio", Velocidad: "200 km/hr", Mm: "15", Status: "Usado"},
	{ Unidad: "ECO 9171 FREIGHTLINER 33K", Medida: "225/70 R-19.5", Marca: "Pirelli", Dot: "DT112341", Design: "Multiradio", Velocidad: "200 km/hr", Mm: "15", Status: "Nuevo"},
];

@Component({
  selector: 'app-tabla2',
  templateUrl: './tabla2.component.html',
  styleUrls: ['./tabla2.component.scss']
})
export class Tabla2Component implements OnInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	myPreloader: boolean = true;
	dataInventory2!: any;

	// displayedColumns: string[] = ['Unidad', 'Medida', 'Fecha', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez', 'Once', 'Doce',    'Notas'];
	displayedColumns: string[] = ['Unidad', 'Medida', 'Marca', 'Dot', 'Design', 'Velocidad', 'Mm', 'Status'];
	dataSource2 = ELEMENT_DATA2;




	tableDisplay = this._formBuilder.group({
		Unidad: true,
		Medida: true,
		Marca: true,
		Dot: true,
		Design: true,
		Velocidad: true,
		Mm: true,
		Status: true
	});


	constructor(private _formBuilder: FormBuilder) {
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

		// this.dataInventory2 = response;

		// console.log("la data es: ", this.dataInventory);
	}

	ngOnInit(): void {
	}

}
