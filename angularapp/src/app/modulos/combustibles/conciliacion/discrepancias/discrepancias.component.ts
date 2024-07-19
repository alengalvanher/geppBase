import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConciliacionService } from '@servicios/combustibles/conciliacion.service';

@Component({
    selector: 'app-discrepancias',
    templateUrl: './discrepancias.component.html',
    styleUrls: ['./discrepancias.component.scss']
})
export class DiscrepanciasComponent implements OnInit {
    @ViewChild('simpleAlert') simpleAlert: any;
    @Input() data
    @Input() fechas
    tableData:any
    displayedColumns: string[] = ['Cedis', 'Ubicacion', 'Fecha'];

    responseDiscrepancias: any

    constructor(
        private modalService: NgbModal,
        private _conciliacionService: ConciliacionService
    ) { }


    ngOnInit(): void {
    }



    abrirModalDiscrepancias() {
        let request = this.fechas
        request.Eco = this.data.Eco
        request.VehicleIdentifier = this.data.VehicleIdentifier

        console.log("REQUEST", request)

        this._conciliacionService.getOutOfCedisDetail( request ).subscribe( response => {
            this.responseDiscrepancias = response

            this.tableData = new MatTableDataSource(response.VehicleOutOfCedisList)
            console.log("response Conciliacion", response)
        })

        this.modalService.open(this.simpleAlert, { centered: true, size: 'md' })
    }
}
