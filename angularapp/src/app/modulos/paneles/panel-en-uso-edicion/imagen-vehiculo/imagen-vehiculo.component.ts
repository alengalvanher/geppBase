import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-imagen-vehiculo',
    templateUrl: './imagen-vehiculo.component.html',
    styleUrls: ['./imagen-vehiculo.component.scss']
})
export class ImagenVehiculoComponent implements OnInit {
    @Input() VehicleTires

    constructor() { }

    ngOnInit(): void {
    }

}
