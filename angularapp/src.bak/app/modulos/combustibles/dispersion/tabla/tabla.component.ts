import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


const TABLE_DATA = [
    { Bloquear: true, Proveedor: "EdenRed", Economico: "6067P", Dispositivo: "6363180020585244", Color: "verde", Estilo: "success", Tipo: "Diesel", Historico: "2.2", Rendimiento: 2.3, Importe: "$1,601.86", Cantidad: "79.45", Cargas: "2", Estacion: "3835" },
    { Bloquear: false, Proveedor: "EdenRed", Economico: "6067P", Dispositivo: "6363180020585244", Color: "rojo", Estilo: "success", Tipo: "Diesel", Historico: "2.2", Rendimiento: 2.3, Importe: "$1,601.86", Cantidad: "79.45", Cargas: "4", Estacion: "3835" },
    { Bloquear: true, Proveedor: "EdenRed", Economico: "6067P", Dispositivo: "6363180020585244", Color: "verde", Estilo: "success", Tipo: "Diesel", Historico: "2.2", Rendimiento: 2.3, Importe: "$1,601.86", Cantidad: "79.45", Cargas: "3", Estacion: "3835" },
    { Bloquear: false, Proveedor: "Gosmo", Economico: "6067P", Dispositivo: "6363180020585244", Color: "verde", Estilo: "success", Tipo: "Diesel", Historico: "2.2", Rendimiento: 2.3, Importe: "$1,601.86", Cantidad: "79.45", Cargas: "3", Estacion: "3835" },
    { Bloquear: true, Proveedor: "EdenRed", Economico: "6067P", Dispositivo: "6363180020585244", Color: "verde", Estilo: "danger", Tipo: "Diesel", Historico: "2.2", Rendimiento: 6.1, Importe: "$1,601.86", Cantidad: "79.45", Cargas: "2", Estacion: "3835" },
    { Bloquear: true, Proveedor: "Gosmo", Economico: "6067P", Dispositivo: "6363180020585244", Color: "verde", Estilo: "success", Tipo: "Diesel", Historico: "2.2", Rendimiento: 2.3, Importe: "$1,601.86", Cantidad: "79.45", Cargas: "2", Estacion: "3835" },
    { Bloquear: false, Proveedor: "EdenRed", Economico: "6067P", Dispositivo: "6363180020585244", Color: "verde", Estilo: "success", Tipo: "Diesel", Historico: "2.2", Rendimiento: 2.3, Importe: "$1,601.86", Cantidad: "79.45", Cargas: "2", Estacion: "3835" },
    { Bloquear: false, Proveedor: "EdenRed", Economico: "6067P", Dispositivo: "6363180020585244", Color: "verde", Estilo: "warning", Tipo: "Diesel", Historico: "2.2", Rendimiento: 4.0, Importe: "$1,601.86", Cantidad: "79.45", Cargas: "2", Estacion: "3835" },
    { Bloquear: false, Proveedor: "EdenRed", Economico: "6067P", Dispositivo: "6363180020585244", Color: "verde", Estilo: "danger", Tipo: "Diesel", Historico: "2.2", Rendimiento: 8.9, Importe: "$1,601.86", Cantidad: "79.45", Cargas: "2", Estacion: "3835" },
    { Bloquear: false, Proveedor: "Gasngo", Economico: "6067P", Dispositivo: "6363180020585244", Color: "verde", Estilo: "success", Tipo: "Diesel", Historico: "2.2", Rendimiento: 2.3, Importe: "$1,601.86", Cantidad: "79.45", Cargas: "2", Estacion: "3835" },
];

@Component({
    selector: 'app-tabla-dispersion',
    templateUrl: './tabla.component.html',
    styleUrls: ['./tabla.component.scss']
})
export class TablaDispersionComponent implements OnInit {
    displayedColumns: string[] = ['Bloquear', 'Proveedor', 'Economico', 'Dispositivo', 'Tipo', 'Historico', 'Rendimiento', 'Importe', 'Cantidad', 'Cargas', 'Estacion'];
    dataInventory: any = new MatTableDataSource(TABLE_DATA);

    constructor(private modalService: NgbModal, private _formBuilder: FormBuilder, private _ngZone:NgZone) {
    }


    BasicOpen(basicmodal: any) {
		this.modalService.open(basicmodal, {
            centered: true,
            size: 'lg'
        });
	}


    ngOnInit(): void {

        // this.dataInventory.filterPredicate = (data: Element, filter: string) => {
        //     return data['Proveedor'] == filter;
        // };

    }
    // Esta función va junto con el componente filtro de columnas
    renderColumns($event){
        this.displayedColumns = $event;
    }


    // Esta función va junto con el componente de filtro de búsqueda.
    readingFilter(e){
        console.log("La e aquí significa", e);
        this.dataInventory.filter = e;
    }
}
