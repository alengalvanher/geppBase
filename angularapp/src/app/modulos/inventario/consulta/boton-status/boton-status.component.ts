import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';

@Component({
    selector: 'app-boton-status',
    templateUrl: './boton-status.component.html',
    styleUrls: ['./boton-status.component.scss']
})
export class BotonStatusComponent implements OnInit {
    @Input() element;
    @Output() clickBack = new EventEmitter();
    @ViewChild('modalStatusStepOne') modalStatusStepOne:any;
    @ViewChild('modalStatusStepTwo') modalStatusStepTwo:any;
    @ViewChild('modalStatusStepThree') modalStatusStepThree:any;
    @ViewChild('modalStatusStepFour') modalStatusStepFour:any;

    modalHeaderData: any = [];
    StatusList:any;
    SubstatusList:any;
    item:string;
    newStatus:string;
    Today:any;
    NewStatusIdentifier:string;
    NewStatusText:string;
    SubstatusText:string;

    formChangeStatus = new FormGroup({
        Status: new FormControl('', [Validators.required])
    });



    formChangeSubstatus = new FormGroup({
        VehicleIdentifier: new FormControl(''),
        Eco: new FormControl(''),
        Status: new FormControl('', [Validators.required]),
        SubStatus: new FormControl('', [Validators.required]),
        Reason: new FormControl('', [Validators.required])
    });

    constructor(
        private modalService: NgbModal,
        private _inventarioService: InventarioService
    ) {

    }

    ngOnInit(): void {
    }


    loadModalStepOne() {
        this.modalService.dismissAll();

        let element = this.element
        console.log("ELEMENT", element);
        this.modalHeaderData = [element.Eco, element.Cbu, element.Region, element.Site, element.VehicleType, element.Identifier, element.StatusIdentifier, element.Status]

        this._inventarioService.getStatus('GetStatus').subscribe(data => {
            this.StatusList = data['StatusCatalogsList'];
            this.formChangeStatus.get('Status').setValue(element.StatusIdentifier)
        })

		this.modalService.open(this.modalStatusStepOne, { centered: true});
	}

    loadModalStepTwo(item){
        console.log("EL ITEM ES: ", item)
        this.NewStatusIdentifier = item.Identifier;
        this.NewStatusText = item.StatusDesc;
        this.newStatus = item.StatusDesc;
        this.item = item['Identifier'];
        this.modalService.dismissAll();
        console.log("Cargando SubStatus");
        this.modalService.open(this.modalStatusStepTwo, { centered: true});
    }

    loadModalStepThree(){
        this.modalService.dismissAll();
        this.modalService.open(this.modalStatusStepThree, { centered: true});


        this._inventarioService.getSubStatus(this.item).subscribe({
            next: (response: any) => {
                if (response.Success === true) {
                    this.SubstatusList = response.SubStatusCatalogList
                }
            },
            error: (error) => console.log("Error de servidor", error),
        })
    }

    loadModalStepFour(){
        this.modalService.dismissAll();
        console.log("Cargando SubStatus");
        this.modalService.open(this.modalStatusStepFour, { centered: true});
    }


    clicked(status) {
        console.log("STATUS", status);
        this.modalService.dismissAll();

        this.modalService.open(this.modalStatusStepTwo, { centered: true});

        // this._inventarioService.getSubStatus(status).subscribe({
        //     next: (response: any) => {
        //         console.log(response)
        //         if (response.Success === true) {

        //         }
        //         else {
        //             console.log("Error")
        //         }

        //     },
        //     error: (error) => console.log("Error de servidor", error),
        // })

    }


    onChangeSubstatus($event: any) {
        this.SubstatusText = $event.target.options[$event.target.options.selectedIndex].text;
    }


    finalizar(){
        console.log("FINALIZADO")
        this.modalService.dismissAll()
        this.clickBack.emit('status')
    }

    sendVehicleAvailability() {
        console.log("ENVIAR")

        console.log("ENVIANDO", this.formChangeSubstatus.value);

        this.formChangeSubstatus.value.VehicleIdentifier = this.element.Identifier;
        this.formChangeSubstatus.value.Eco = this.element.Eco;
        this.formChangeSubstatus.value.Status = this.NewStatusIdentifier;


        this._inventarioService.setVehicleAvailability(this.formChangeSubstatus.value).subscribe({
            next: (response: any) => {
                console.log(response)
                if (response.Success === true) {
                    var nowDate = new Date();
                    this.Today = nowDate.getDate() + '/' + (nowDate.getMonth()) + '/' + nowDate.getFullYear();

                    this.modalService.open(this.modalStatusStepFour, { centered: true});
                }
                else {
                    console.log("Error")
                }

            },
            error: (error) => console.log("Error de servidor", error),
        })
    }
}
