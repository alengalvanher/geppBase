import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
    selector: 'app-grafica-bar',
    templateUrl: './grafica-bar.component.html',
    styleUrls: ['./grafica-bar.component.scss']
})
export class GraficaBarComponent implements OnInit {
    @Input() chartData


    constructor() { }

    ngOnInit(): void {
    }

}
