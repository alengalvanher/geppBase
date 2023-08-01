import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-editor-neumatico-individual',
    templateUrl: './editor-neumatico-individual.component.html',
    styleUrls: ['./editor-neumatico-individual.component.scss']
})
export class EditorNeumaticoIndividualComponent implements OnInit {
    @Input() item
    edicion:boolean = false


    formMillimeter = new FormGroup({
        Millimeter: new FormControl(''),
		PSI: new FormControl(''),
		TireCondition: new FormControl('')
    })

    constructor() { }



    ngOnInit(): void {
    }
}
