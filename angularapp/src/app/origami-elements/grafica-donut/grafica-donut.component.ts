import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
    selector: 'app-grafica-donut',
    templateUrl: './grafica-donut.component.html',
    styleUrls: ['./grafica-donut.component.scss']
})
export class GraficaDonutComponent implements OnInit {
    @Input() data
    @Input() chartData

    constructor() { }

    ngOnInit(): void {

    }
}
