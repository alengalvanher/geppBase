import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-bloquear',
    templateUrl: './bloquear.component.html',
    styleUrls: ['./bloquear.component.scss']
})
export class BloquearComponent implements OnInit {
    @Input() bloqueado = false;

    constructor() { }

    ngOnInit(): void {
    }

}
