import { Component, Input, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';

@Component({
    selector: 'app-boton-descargar-excel',
    templateUrl: './boton-descargar-excel.component.html',
    styleUrls: ['./boton-descargar-excel.component.scss']
})
export class BotonDescargarExcelComponent implements OnInit {
    @Input() dataSource

    constructor(
        private _fileSaver:FileSaverService,
    ) { }

    ngOnInit(): void {
    }


    exportToExcel() {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';

        const worksheet = XLSX.utils.json_to_sheet(this.dataSource);

        const workbook = {
            Sheets: {
                'testingSheet': worksheet
            },
            SheetNames: ['testingSheet']
        }

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

        const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE })

        this._fileSaver.save(blobData, "DemoFile")
    }
}
