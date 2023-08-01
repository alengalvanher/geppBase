import { Component, OnInit, Input, ElementRef, QueryList, ViewChildren, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InventarioService } from "../../../../servicios/inventario/inventario.service"
import { ConsultaDetalleService } from '../..//servicios/consulta-detalle.service';
import { FormularioService } from '../../servicios/formulario.service';

@Component({
    selector: 'app-cambio-status',
    templateUrl: './cambio-status.component.html',
    styleUrls: ['./cambio-status.component.scss']
})
export class CambioStatusComponent implements OnInit {
    @Input() dataHeader: string;
    @Output() clickBack = new EventEmitter();
    @ViewChildren('itemsRadio') itemsRadio: QueryList<ElementRef>;

    StatusList: any;
    SubstatusList: any;
    SubstatusText: any;
    StatusFound: any;
    Today: any;

    Step: number = 1;
    StatusText: any;

    formChangeStatus = new FormGroup({
        VehicleIdentifier: new FormControl(''),
        Eco: new FormControl(''),
        Status: new FormControl('', [Validators.required]),
        SubStatus: new FormControl('', [Validators.required]),
        Reason: new FormControl('', [Validators.required])
    });

    constructor(
        private _inventarioService: InventarioService
    ) {
        this._inventarioService.getStatus('GetStatus').subscribe(data => {
            this.StatusList = data['StatusCatalogsList'];
            console.log(this.dataHeader)
        })
        this.formChangeStatus.valueChanges.subscribe(data => {
            console.log(data)
        })

    }

    clicked(item, i, statusText) {
        console.log('item clicked : ', item);
        console.log('index of item : ', i);
        console.log('StatusText : ', statusText);

        this.StatusText = statusText

        this._inventarioService.getSubStatus(item).subscribe({
            next: (response: any) => {
                console.log(response)
                if (response.Success === true) {
                    this.SubstatusList = response.SubStatusCatalogList
                }
                else {
                    console.log("Error")
                }

            },
            error: (error) => console.log("Error de servidor", error),
        })

        setTimeout(() => {
            this.Step = 2
        }, 100);
    }

    back2stepOne() {
        this.Step = 1
    }
    back2statusForm() {
        this.Step = 3
    }
    onChangeSubstatus($event: any) {
        this.SubstatusText = $event.target.options[$event.target.options.selectedIndex].text;
    }
    sendVehicleAvailability() {

        this._inventarioService.setVehicleAvailability(this.formChangeStatus.value).subscribe({
            next: (response: any) => {
                console.log(response)
                if (response.Success === true) {
                    this.Step = 4
                    var nowDate = new Date();
                    this.Today = nowDate.getDate() + '/' + (nowDate.getMonth()) + '/' + nowDate.getFullYear();
                }
                else {

                    console.log("Error")
                }

            },
            error: (error) => console.log("Error de servidor", error),
        })
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        console.log('destroy')
        // this._consultaDetalleService.Data4tansfer.unsubscribe();
    }

    ngOnInit(): void {
        //console.log(this.dataHeader, this.StatusList)
        this.formChangeStatus.setValue({
            VehicleIdentifier: this.dataHeader[5],
            Eco: this.dataHeader[0],
            Status: this.dataHeader[6],
            SubStatus: '',
            Reason: ''
        });
    }
}
