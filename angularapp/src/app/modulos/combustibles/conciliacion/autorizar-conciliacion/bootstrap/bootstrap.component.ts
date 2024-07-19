import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConciliacionService } from '@servicios/combustibles/conciliacion.service';

@Component({
    selector: 'app-bootstrap',
    templateUrl: './bootstrap.component.html',
    styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent implements OnInit {
    @Input() data
    responseGetFuelConciliation:any
    dataTable:any
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    displayedColumns: string[] = ['Cebe', 'Cedis', 'ProductQuantity', 'NetAmount', 'IVA']

    constructor(
        private _conciliacionService:ConciliacionService
    ) { }

    ngOnInit(): void {
        this.getData()
    }


    getData(){


        this._conciliacionService.getFuelConciliation(this.data).subscribe( response => {
			// this.dataResponse = new MatTableDataSource(response.FuelConciliation);
            this.dataTable = new MatTableDataSource(response.FuelConciliation)
            this.dataTable.paginator = this.paginator

            console.log("RESPONSE RESPONSE", response)
		})
    }
}

// PET EDP - 2
// BEC - 1
