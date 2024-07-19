import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConciliacionService } from '@servicios/combustibles/conciliacion.service';

import { saveAs } from 'file-saver';


export interface inventarioData {
    Id: string;
    MovementType: string;
    Status: string;
    MovementDate: string;
    MovementDetail: string;
    MovementDescription: string;
    Responsable: string;
    Approved: string;
}
@Injectable({
    providedIn: 'root'
})

@Component({
    selector: 'app-descargar-conciliacion',
    templateUrl: './descargar-conciliacion.component.html',
    styleUrls: ['./descargar-conciliacion.component.scss']
})
export class DescargarConciliacionComponent implements OnInit {
    @Input() dataHeader: string;


    @Input() supplier
    @Input() date
    mainResponse:any
    active:any
    cbu:string = localStorage.getItem('cbuText')


    @Output() clickBack = new EventEmitter();

    myPreloader: boolean = true;
    filters: Array<string> = [];
    displayedColumns: string[] = ['Cebe', 'Cedis', 'ProductQuantity', 'NetAmount', 'IVA']
    dataTable:any

    @ViewChild(MatPaginator) paginator!: MatPaginator;


    constructor(
        private _conciliacionService: ConciliacionService
    ) {

    }

    translatePaginator() {
        this.paginator._intl.firstPageLabel = "Primera página";
        this.paginator._intl.itemsPerPageLabel = "Registros por página";
        this.paginator._intl.nextPageLabel = "Página siguiente";
        this.paginator._intl.previousPageLabel = "Página anterior";
        this.paginator._intl.lastPageLabel = "Ultima página";

        //console.log("Paginator", this.paginator._intl);
    }

    ngOnInit(): void {
        this.traerDatosConciliacion()
        this.active = 'Comercial'
    }

    tabSelected(supplier) {
        console.log("Supplier", supplier)

        if(supplier == "Commercial") {
            console.log("Cargando Commercial", this.mainResponse.FuelConciliation.Commercial)


            this.dataTable = this.mainResponse.FuelConciliation.Commercial
            setTimeout(() => {
                this.dataTable.paginator = this.paginator
            }, 1);
        }

        if(supplier == "Supply") {
            console.log("Cargando Supply", this.mainResponse.FuelConciliation.Supply)
            this.dataTable =  this.mainResponse.FuelConciliation.Supply
            setTimeout(() => {
                this.dataTable.paginator = this.paginator
            }, 1);
        }
	}




    // Esta función va junto con el componente filtro de columnas
    renderColumns($event) {
        this.displayedColumns = $event;
    }

    // Esta función va junto con el componente de filtro de búsqueda.
    readingFilter(e) {
        this.dataTable.filter = e;
    }

    //Filtros de cabecera
    applyFilter(filterString) {
        //console.log(filterString);
        this.dataTable.filter = filterString;


    }




    descargar(){
        let objeto = this.date
        objeto.Cbu = localStorage.getItem('cbuText')
        objeto.Supplier = this.supplier


        this._conciliacionService.getConciliationFile(objeto).subscribe({
            next: (data) => {
                let nombreArchivo = "descarga.xlsx"
                const contentDisposition = data.headers.get('Content-Disposition')

                if (contentDisposition) {
                    const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = fileNameRegex.exec(contentDisposition);
                    if (matches != null && matches[1]) {
                        nombreArchivo = matches[1].replace(/['"]/g, '');
                    }
                }

                saveAs(data.body, nombreArchivo);

                console.log("Se descargó con éxito", data)
            },
            error: (error) => {
                console.log("Ocurrió un error", error)
            },
            complete: () => {
                console.log("Se completó")
            }
        })
    }


    traerDatosConciliacion(){
		let objeto = this.date
        objeto.Cbu = localStorage.getItem('cbuText')
        objeto.Supplier = this.supplier


        this._conciliacionService.getFuelConciliation(objeto).subscribe( response => {

            console.log("Trayendo data desde la función  traerDatosConciliacion", response)

            this.mainResponse = response


            if( this.mainResponse.FuelConciliation.Commercial ){
                console.log("Primera opción")
                this.dataTable = new MatTableDataSource(this.mainResponse.FuelConciliation.Commercial)
            } else {
                console.log("Segunda opción")
                this.dataTable = new MatTableDataSource(this.mainResponse.FuelConciliation)
            }

            this.dataTable.paginator = this.paginator

        })
    }

}
