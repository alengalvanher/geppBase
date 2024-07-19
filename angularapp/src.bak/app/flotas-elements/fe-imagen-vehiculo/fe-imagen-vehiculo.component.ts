import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-imagen-vehiculo',
    templateUrl: './fe-imagen-vehiculo.component.html',
    styleUrls: ['./fe-imagen-vehiculo.component.scss']
})
export class FeImagenVehiculoComponent implements OnInit {
    @Input() VehicleTires

    constructor() { }

    ngOnInit(): void {
    }

}
