import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NeumaticosService } from 'src/app/servicios/neumaticos/neumaticos.service';

@Component({
    selector: 'app-editor-neumatico-individual',
    templateUrl: './editor-neumatico-individual.component.html',
    styleUrls: ['./editor-neumatico-individual.component.scss']
})
export class EditorNeumaticoIndividualComponent implements OnInit {
    @ViewChild('simpleAlert') simpleAlert: any;
    @Input() item
    @Input() PhysicalDamage
    edicion: boolean = false
    responseData:any


    milimetrajes = [
		{ value: '1', viewValue: '1' },
		{ value: '2', viewValue: '2' },
		{ value: '3', viewValue: '3' },
        { value: '4', viewValue: '4' },
        { value: '5', viewValue: '5' }
	]

    psi = [
		{ value: '10', viewValue: '10' },
		{ value: '20', viewValue: '20' },
		{ value: '30', viewValue: '30' },
        { value: '40', viewValue: '40' },
        { value: '50', viewValue: '50' }
	]



    formMillimeter = new FormGroup({
        Millimeter: new FormControl(''),
        PSI: new FormControl(''),
        TireCondition: new FormControl('')
    })

    constructor(
        private _neumaticosService: NeumaticosService,
        private _ngbModal: NgbModal
    ) {

    }


    ngOnInit(): void {
    }


    cancelar(){
        this.edicion = false
    }


    actualizar(){
        this.edicion = true
    }


    enviar(){

        let values = this.formMillimeter.value
        let object = {
            Id: this.item.id,
            Eco: this.item.Eco,
            Millimeter: values.Millimeter,
            PSI: values.PSI,
            PhysicalDamage: values.TireCondition,
            Cedis: 'BAAG',
        }

        this._neumaticosService.setTireMillimeter(object).subscribe(response => {
            console.log("Response", response)
            this.responseData = response

            this._ngbModal.open(this.simpleAlert, { centered: true, backdrop: 'static', keyboard: false });
        })
    }


    modalDismiss() {
        this._ngbModal.dismissAll();
    }
}
