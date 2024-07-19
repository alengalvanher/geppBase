import { Component, Input, OnInit } from '@angular/core';
import { NeumaticosService } from "../../../servicios/neumaticos/neumaticos.service"


@Component({
    selector: 'app-panel-en-uso-detalle',
    templateUrl: './panel-en-uso-detalle.component.html',
    styleUrls: ['./panel-en-uso-detalle.component.scss']
})
export class PanelEnUsoDetalleComponent implements OnInit {
    @Input() data
    dataResponse

    dataResponesTireList
    PhysicalDamageCatalog: any
    vehicleIdentifier: any
    eco: any
    detailData: any


    constructor(
        private _neumaticosService: NeumaticosService,
    ) {
        this.getPhysicalDamageCatalog()
    }


    ngOnInit(): void {
        this.updateDataTireInventoryDetail()
    }



    ngAfterViewInit(): void {
    }


    ngOnChanges() {
        this.updateDataTireInventoryDetail()
    }


    updateDataTireInventoryDetail() {
        console.log("this.data", this.data)

        if (this.data) {
            this._neumaticosService.getTireInventoryDetail(this.data).subscribe({
                next: (response: any) => {

                    if (response.Success == true) {
                        this.dataResponse = response
                        console.log("data response", response)
                        this.dataResponesTireList = response['VehicleTireDetails']
                    } else if (response.Success == false) {
                        alert(response.Message)
                    }

                },
                error: (error) => console.log('Error', error),
                complete: () => {
                    console.log('complete')
                }
            })
        } else {
            alert("Ocurrió un error, no hay data que envíar")
        }

    }


    getPhysicalDamageCatalog() {
        this._neumaticosService.getPhysicalDamageCatalog().subscribe(response => {
            console.log("Trayendo catalogo", response)
            this.PhysicalDamageCatalog = response
        })
    }
}
