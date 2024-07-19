import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-cuadro-de-medicion',
    templateUrl: './cuadro-de-medicion.component.html',
    styleUrls: ['./cuadro-de-medicion.component.scss']
})
export class CuadroDeMedicionComponent implements OnInit {
    @Input() medicion
    @Input() orientacion

    constructor() { }

    ngOnInit(): void {
    }

}
