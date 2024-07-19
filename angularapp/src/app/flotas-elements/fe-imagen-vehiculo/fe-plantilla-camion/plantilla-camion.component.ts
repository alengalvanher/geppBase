import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-plantilla-camion',
    templateUrl: './plantilla-camion.component.html',
    styleUrls: ['./plantilla-camion.component.scss']
})
export class PlantillaCamionComponent implements OnInit {
    @Input() tires

    constructor() { }

    ngOnInit(): void {
    }

}
