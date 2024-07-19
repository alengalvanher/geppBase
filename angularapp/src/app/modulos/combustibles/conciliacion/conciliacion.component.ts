import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { ConciliacionService } from 'src/app/servicios/combustibles/conciliacion.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
	selector: 'app-conciliacion',
	templateUrl: './conciliacion.component.html',
	styleUrls: ['./conciliacion.component.scss']
})
export class ConciliacionComponent implements OnInit {
	@ViewChild('tabsSuppliers') tabsSuppliers: NgbNav;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	tabs: string[]
	mainResponse: any
	FuelSupplierSummary:any
	displayedColumns: string[] = ['Eco', 'NetAmountIEPS', 'Quantity', 'Fecha', 'Cebe', 'Cedis', 'Region', 'Area', 'Categoria', 'Transaccion']
	tableDataSource: any
	active:any
	currentSupplier:string
	currentDate:any
	modalHeaderData: any = [];

	openHistoricPanel: boolean = false;

	constructor(
		private _conciliacionService: ConciliacionService
	) {
		this.traerProveedoresDisponibles()

		this.traerSemanaActual()
	}


	ngOnInit(): void {
		this.active = 'Edenred'
	}




	receivingDate($event) {
		this.currentDate = $event

		let objeto = $event;
		objeto.Cbu = localStorage.getItem('cbuText')
		objeto.Supplier = this.currentSupplier

		console.log("AQUI MANDA", objeto)

		this.traerInformacionTabla(objeto);
	}




	// Esta función va junto con el componente filtro de columnas
	renderColumns($event) {
		this.displayedColumns = $event
	}


	// Esta función va junto con el componente de filtro de búsqueda.
	readingFilter(e) {
		this.tableDataSource.filter = e;
	}


	tabSelected(supplier) {
		this.currentSupplier = supplier

		let objeto = {
			Week: 9,
			Year: 2023,
			Supplier: supplier,
		}

		this.traerInformacionTabla(objeto);
	}


	// Trae información y se llama varias veces.
	traerInformacionTabla(objeto: any) {

		console.log("Haciendo la consulta con: ", objeto);

		this._conciliacionService.GetFuelSupplierConciliationWithSummary(objeto).subscribe(response => {
			console.log("RESPONSE", response)
			this.mainResponse = response
			this.FuelSupplierSummary = response.FuelSupplierSummary
			this.tableDataSource = new MatTableDataSource(response.FuelSupplierConciliationsList)
			this.tableDataSource.paginator = this.paginator;
		});
	}


	// Se ejecuta al iniciar y trae lod proveedores para tabs.
	traerProveedoresDisponibles() {
		this._conciliacionService.GetSupplierTabs().subscribe(response => {
			this.tabs = response.Suppliers
			this.currentSupplier = response.Suppliers[0]
			this.primerRequest(response.Suppliers[0])
		})
	}


	// Se ejecuta una sola vez al inicio
	primerRequest(supplier) {
		let objeto = {
			
			Supplier: supplier,
			Cbu: localStorage.getItem('cbuText')
		}

		this.traerInformacionTabla(objeto);
	}


	traerSemanaActual(){
		let fechaActual:any = new Date()
		let anioActual:any =  new Date(fechaActual.getFullYear(), 0, 1)
		let numeroDeDiasTranscurridos = Math.floor((fechaActual - anioActual) / (24 * 60 * 60 * 1000))
		let numeroSemanaActual = Math.ceil(( fechaActual.getDay() + 1 + numeroDeDiasTranscurridos) / 7)
		return numeroSemanaActual
	}


	traerAnioActual(){
		let fechaActual:any = new Date()
		let anioActual:any =  fechaActual.getFullYear()
		
		return anioActual
	}





	// ABRIR DESCARGAS
	closeHistorico($event: any){
		this.openHistoricPanel = $event
	}

	abrirDescargas() {
		this.openHistoricPanel = true
	}

	
}
