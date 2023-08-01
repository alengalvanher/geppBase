import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-plantilla-auto',
    templateUrl: './plantilla-auto.component.html',
    styleUrls: ['./plantilla-auto.component.scss']
})
export class PlantillaAutoComponent implements OnInit {
    @Input() tires

    constructor() { }

    ngOnInit(): void {
    }

}
