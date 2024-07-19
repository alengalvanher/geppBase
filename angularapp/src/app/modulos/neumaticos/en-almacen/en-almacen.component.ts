import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const TABLE_DATA = [
    { Acciones: "true", Tipo: "Nueva", Region: "Región 8", Sitio: "Oaxaca", Dot: "DT11 4067", Marca: "Firestone", Rin: "R-13", Medida: "185/60 R-13", Ancho: "185", Alto: "60", Diseno: "Multiradio", Mm: "15", Velocidad: "140 km/hr" },
    { Acciones: "true", Tipo: "Renovada", Region: "Región 3", Sitio: "Zapopan Xdc", Dot: "DT11 4068", Marca: "Firestone", Rin: "R-13", Medida: "185/60 R-13", Ancho: "185", Alto: "60", Diseno: "Multiradio", Mm: "15", Velocidad: "141 km/hr" },
    { Acciones: "true", Tipo: "Stock usado", Region: "Región 3", Sitio: "Maravatío", Dot: "DT11 4069", Marca: "Michelin", Rin: "R-13", Medida: "185/60 R-13", Ancho: "185", Alto: "60", Diseno: "Multiradio", Mm: "15", Velocidad: "142 km/hr" },
    { Acciones: "true", Tipo: "Destrucción", Region: "Región 3", Sitio: "Zapopan Xdc", Dot: "DT11 4070", Marca: "Firestone", Rin: "R-14", Medida: "185/60 R-14", Ancho: "185", Alto: "60", Diseno: "Multiradio", Mm: "15", Velocidad: "143 km/hr" },
    { Acciones: "true", Tipo: "Nueva", Region: "Región 3", Sitio: "Zapopan Xdc", Dot: "DT11 4071", Marca: "Michelin", Rin: "R-14", Medida: "185/60 R-14", Ancho: "185", Alto: "60", Diseno: "Multiradio", Mm: "15", Velocidad: "144 km/hr" },
    { Acciones: "true", Tipo: "Destrucción", Region: "Región 4", Sitio: "Poza rica", Dot: "DT11 4072", Marca: "Michelin", Rin: "R-15", Medida: "185/60 R-15", Ancho: "185", Alto: "60", Diseno: "Multiradio", Mm: "15", Velocidad: "145 km/hr" },
    { Acciones: "true", Tipo: "Renovada", Region: "Región 6", Sitio: "Cuautitlán", Dot: "DT11 4073", Marca: "Michelin", Rin: "R-15", Medida: "185/60 R-15", Ancho: "185", Alto: "60", Diseno: "Multiradio", Mm: "15", Velocidad: "146 km/hr" },
    { Acciones: "true", Tipo: "Stock usado", Region: "Región 7", Sitio: "Acapulco", Dot: "DT11 4074", Marca: "Firestone", Rin: "R-15", Medida: "185/60 R-15", Ancho: "185", Alto: "60", Diseno: "Multiradio", Mm: "15", Velocidad: "147 km/hr" },
    { Acciones: "true", Tipo: "Stock usado", Region: "Región 3", Sitio: "Zapopan Xdc", Dot: "DT11 4075", Marca: "Michelin", Rin: "R-15", Medida: "185/60 R-15", Ancho: "185", Alto: "60", Diseno: "Multiradio", Mm: "15", Velocidad: "148 km/hr" },
    { Acciones: "true", Tipo: "Renovada", Region: "Región 2", Sitio: "San Luis Potosí", Dot: "DT11 4076", Marca: "Firestone", Rin: "R-16", Medida: "185/60 R-16", Ancho: "185", Alto: "60", Diseno: "Multiradio", Mm: "15", Velocidad: "149 km/hr" }
];









const BLUE_BAR_DATA = [
    { amount: "$-2,805.57", description: "Monto mensual de depreciación" },
    { amount: "10", description: "Meses faltantes" },
    { amount: "$8,416.72", description: "Valor en libro" },
    { amount: "2018", description: "Año de compra" },
    { amount: "Leasing financiero", description: "Origen de compra" },
];

@Component({
    selector: 'app-en-almacen',
    templateUrl: './en-almacen.component.html',
    styleUrls: ['./en-almacen.component.scss']
})
export class EnAlmacenComponent implements OnInit {

    dataInventory = new MatTableDataSource(TABLE_DATA);

    displayedColumns: string[] = ['Acciones', 'Tipo', 'Region', 'Sitio', 'Dot', 'Marca', 'Rin', 'Medida', 'Ancho', 'Alto', 'Diseno', 'Mm', 'Velocidad'];
    @ViewChild('mymodal') mymodal: any;
    @ViewChild('mymodalPasoDos') mymodalPasoDos: any;



    tableDisplay = this._formBuilder.group({
        Acciones: true,
        Tipo: true,
        Region: true,
        Sitio: true,
        Dot: true,
        Marca: true,
        Rin: true,
        Medida: true,
        Ancho: true,
        Alto: true,
        Diseno: true,
        Mm: true,
        Velocidad: true
    });


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


    nuevaSolicitud() {
        this.modalService.open(this.mymodal, { centered: true });
    }

    nuevaSolicitudPasoDos() {
        this.modalService.open(this.mymodalPasoDos, { centered: true });
    }

    accept(modal: any) {
        modal.close();
    }



    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataInventory.filter = filterValue.trim().toLowerCase();
    }


    // Esta función va junto con el componente de filtro de búsqueda.
    readingFilter(e){
        this.dataInventory.filter = e;
    }
}
