import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-porcentaje',
    templateUrl: './porcentaje.component.html',
    styleUrls: ['./porcentaje.component.scss']
})
export class PorcentajeComponent implements OnInit {
    @Input() porcentaje;

    constructor() { }

    ngOnInit(): void {
    }

}
