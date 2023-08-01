import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const TABLE_DATA = [
    {Acciones:"1",Fecha:"31/12/2022",Economico:"4724BAN",Orden:"65479098",Status:"Autorizado",Posicion:"D1",Motivo:"Reemplazo por desgaste"},
    {Acciones:"2",Fecha:"12/05/2021",Economico:"5649UC",Orden:"65479099",Status:"En revisión",Posicion:"I1",Motivo:"Reemplazo por desgaste"},
    {Acciones:"3",Fecha:"12/06/2021",Economico:"6190P",Orden:"65479100",Status:"Autorizado",Posicion:"D1",Motivo:"Reemplazo por desgaste"},
    {Acciones:"4",Fecha:"12/07/2021",Economico:"5215P",Orden:"65479101",Status:"Ingresada",Posicion:"D1",Motivo:"Reemplazo por desgaste"},
    {Acciones:"5",Fecha:"12/08/2021",Economico:"1002AL",Orden:"65479102",Status:"Autorizado",Posicion:"D1",Motivo:"Reemplazo por desgaste"},
    {Acciones:"6",Fecha:"12/09/2021",Economico:"6640P",Orden:"65479103",Status:"Ingresada",Posicion:"I2",Motivo:"Reemplazo por desgaste"},
    {Acciones:"7",Fecha:"12/10/2021",Economico:"6174UC",Orden:"65479104",Status:"Ingresada",Posicion:"D1",Motivo:"Reemplazo por desgaste"},
    {Acciones:"8",Fecha:"12/11/2021",Economico:"6162UC",Orden:"65479105",Status:"Ingresada",Posicion:"D2",Motivo:"Reemplazo por desgaste"},
    {Acciones:"9",Fecha:"12/12/2021",Economico:"4626BAN",Orden:"65479106",Status:"Autorizado",Posicion:"I1",Motivo:"Reemplazo por desgaste"},
    {Acciones:"10",Fecha:"12/13/2021",Economico:"5780UC",Orden:"65479107",Status:"En revisión",Posicion:"I1",Motivo:"Reemplazo por desgaste"},
    {Acciones:"11",Fecha:"12/14/2021",Economico:"6140P",Orden:"65479108",Status:"Autorizado",Posicion:"D2",Motivo:"Reemplazo por desgaste"},
    {Acciones:"12",Fecha:"12/15/2021",Economico:"4912R",Orden:"65479109",Status:"Autorizado",Posicion:"D1",Motivo:"Reemplazo por desgaste"},
    {Acciones:"13",Fecha:"12/16/2021",Economico:"6641EDP",Orden:"65479110",Status:"Autorizado",Posicion:"D1",Motivo:"Reemplazo por desgaste"},
    {Acciones:"14",Fecha:"12/17/2021",Economico:"5602R",Orden:"65479111",Status:"Autorizado",Posicion:"I2",Motivo:"Reemplazo por desgaste"}
];





const BLUE_BAR_DATA = [
	{ amount: "$-2,805.57", description: "Monto mensual de depreciación" },
	{ amount: "10", description: "Meses faltantes" },
	{ amount: "$8,416.72", description: "Valor en libro" },
	{ amount: "2018", description: "Año de compra" },
	{ amount: "Leasing financiero", description: "Origen de compra" },
];


@Component({
    selector: 'app-solicitud',
    templateUrl: './solicitud.component.html',
    styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {
    dataInventory = new MatTableDataSource(TABLE_DATA);
	displayedColumns: string[] = ['Acciones', 'Fecha', 'Economico', 'Orden', 'Status', 'Posicion', 'Motivo'];
    @ViewChild('mymodal') mymodal: any;
    @ViewChild('mymodalPasoDos') mymodalPasoDos: any;


	businessUnitSelectValues = [
		{ value: 'BEC', viewValue: 'BEC' },
		{ value: 'EDP', viewValue: 'EDP' },
		{ value: 'PET', viewValue: 'PET' }
	];

	supplySelectValues = [
		{ value: 'Enero', viewValue: 'Enero' },
		{ value: 'Febrero', viewValue: 'Febrero' },
		{ value: 'Marzo', viewValue: 'Marzo' },
        { value: 'Abril', viewValue: 'Abril' },
        { value: 'Mayo', viewValue: 'Mayo' },
        { value: 'Junio', viewValue: 'Junio' },
        { value: 'Julio', viewValue: 'Julio' },
        { value: 'Agosto', viewValue: 'Agosto' },
        { value: 'Septiembre', viewValue: 'Septiembre' },
        { value: 'Octubre', viewValue: 'Octubre' },
        { value: 'Noviembre', viewValue: 'Noviembre' },
        { value: 'Diciembre', viewValue: 'Diciembre' },
	];


    topBarForm = new FormGroup({
        BusinessUnit: new FormControl(''),
        week: new FormControl(''),
        supply: new FormControl('')
    })


    constructor(private modalService: NgbModal, private _formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
    }


    nuevaSolicitud(){
        this.modalService.open(this.mymodal, { centered: true});
    }

    nuevaSolicitudPasoDos(){
        this.modalService.open(this.mymodalPasoDos, { centered: true});
    }

    accept(modal:any) {
		modal.close();
	}


    // Esta función va junto con el componente filtro de columnas
    renderColumns($event){
        this.displayedColumns = $event;
    }


    // Esta función va junto con el componente de filtro de búsqueda.
    readingFilter(e){
        this.dataInventory.filter = e;
    }
}
