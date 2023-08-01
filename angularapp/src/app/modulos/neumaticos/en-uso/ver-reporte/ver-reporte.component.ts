import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NeumaticosService } from '@servicios/neumaticos/neumaticos.service';

import { saveAs } from 'file-saver';

@Component({
    selector: 'app-ver-reporte',
    templateUrl: './ver-reporte.component.html',
    styleUrls: ['./ver-reporte.component.scss']
})
export class VerReporteComponent implements OnInit {
    @ViewChild('detalleNeumaticos') detalleNeumaticos: any;
    @Input() dateFilter
    responseTiresToChange:any
    
    disableFileSave:boolean = false

    constructor(
        private neumaticosService: NeumaticosService,
        private modalService: NgbModal,
    ) {}

    ngOnInit(): void {
    }




    cargarDetalleNeumaticos() {
        let data = this.dateFilter
        data['Cedis'] = "BAAG"

        this.neumaticosService.getTiresToChange(data).subscribe(response => {
            // console.log("RESPONSE", response)
            this.responseTiresToChange = response
            if(this.responseTiresToChange['Success'] = true){
                if(this.responseTiresToChange.TotalBackTires == 0 && this.responseTiresToChange.TotalFrontTires == 0 && this.responseTiresToChange.TotalVehicle == 0){
                    console.log("RESPONSE", this.responseTiresToChange.Message)

                    this.disableFileSave = true
                }
            }
        })

        this.modalService.open(this.detalleNeumaticos, { centered: true, size: 'lg' })
    }


    descargar(){
        let data = this.dateFilter
        data['Cedis'] = "BAAG"

        console.log("Enviando esto: ", data)

        this.neumaticosService.getTiresToChangeReportFile(data).subscribe({
            next: (response) => {
                console.log("RESPONSEEEEE", response)
                let nombreArchivo = "descarga.xlsx"
                const contentDisposition = response.headers.get('Content-Disposition')

                if (contentDisposition) {
                    const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = fileNameRegex.exec(contentDisposition);
                    if (matches != null && matches[1]) {
                        nombreArchivo = matches[1].replace(/['"]/g, '');
                    }
                }

                saveAs(response.body, nombreArchivo);

               
            },
            error: (error) => {
                console.log("Ocurrió un error", error)
            },
            complete: () => {
                console.log("Se completó")
                
            }
        })
    }
}
