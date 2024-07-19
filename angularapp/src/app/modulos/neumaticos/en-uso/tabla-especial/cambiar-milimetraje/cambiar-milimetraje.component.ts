import { Component, Input, OnInit } from '@angular/core';
import { NeumaticosService } from 'src/app/servicios/neumaticos/neumaticos.service';

@Component({
    selector: 'app-cambiar-milimetraje',
    templateUrl: './cambiar-milimetraje.component.html',
    styleUrls: ['./cambiar-milimetraje.component.scss']
})
export class CambiarMilimetrajeComponent implements OnInit {
    @Input() dataInput
    dataResponse:any
    dataResponesTireList:any
    PhysicalDamageCatalog:any

    constructor(
        private _neumaticosService:NeumaticosService
    ) {

        this.getPhysicalDamageCatalog()

    }

    ngOnInit(): void {
        this._neumaticosService.getTireInventoryDetail(this.dataInput).subscribe(response => {
            this.dataResponse = response
            this.dataResponesTireList = response['VehicleTireDetails']
            console.log("TRAER DATA RESPONSE", this.dataResponse)
        })
    }


    ngOnChanges(): void {
        this._neumaticosService.getTireInventoryDetail(this.dataInput).subscribe(response => {
            this.dataResponse = response
            this.dataResponesTireList = response['VehicleTireDetails']
            console.log("TRAER DATA RESPONSE", this.dataResponse)
        })
    }


    getPhysicalDamageCatalog(){
        this._neumaticosService.getPhysicalDamageCatalog().subscribe(response => {
            this.PhysicalDamageCatalog = response
        })
    }
}
