import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConciliacionService } from '@servicios/combustibles/conciliacion.service';

import { saveAs } from 'file-saver';

@Component({
    selector: 'app-autorizar-conciliacion',
    templateUrl: './autorizar-conciliacion.component.html',
    styleUrls: ['./autorizar-conciliacion.component.scss']
})
export class AutorizarConciliacionComponent implements OnInit {
    @Input() supplier
    @Input() date
    @ViewChild('myModal') myModal: any
    @ViewChild(MatPaginator) otropaginador: MatPaginator
    mainResponse:any

    displayedColumns: string[] = ['Cebe', 'Cedis', 'ProductQuantity', 'NetAmount', 'IVA']
    dataTable:any

    constructor(
        private _ngbModal: NgbModal,
        private _conciliacionService: ConciliacionService
    ) { }

    ngOnInit(): void {
        // this.dataTable = new MatTableDataSource(this.dataInput)
        // setTimeout(() => this.dataTable.paginator = this.paginator);
        this.traerDatosConciliacion()
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

        })
    }


    abrirModal(){
        this._ngbModal.open(this.myModal, { size: 'lg', centered: true });

        if( this.mainResponse.FuelConciliation.Commercial ){
            console.log("Primera opción")
            this.dataTable = new MatTableDataSource(this.mainResponse.FuelConciliation.Commercial)
        } else {
            console.log("Segunda opción")
            this.dataTable = new MatTableDataSource(this.mainResponse.FuelConciliation)
        }

        this.dataTable.paginator = this.otropaginador
    }
}
