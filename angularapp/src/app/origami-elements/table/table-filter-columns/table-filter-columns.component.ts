import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-table-filter-columns',
    templateUrl: './table-filter-columns.component.html',
    styleUrls: ['./table-filter-columns.component.scss']
})
export class TableFilterColumnsComponent implements OnInit {
    @Input() columns: any;
    @Output() returnedColumns = new EventEmitter<any>();
    tableDisplay: FormGroup = new FormGroup({});

    constructor() {
    }


    ngOnInit(): void {
        this.createForm(this.columns);

        this.tableDisplay.valueChanges.subscribe(data => {
            this.returnedColumns.emit(this.convertFormToArray(data));
        })
    }

    createForm(columns) {
        for (var i = 0; i < columns.length; i++) {
            this.tableDisplay.addControl(columns[i], new FormControl(true));
        }
    }


    convertFormToArray(data) {
        let arrayWithColumns = [];

        for (const [key, value] of Object.entries(data)) {
            if (value === true) {
                arrayWithColumns.push(key);
            }
        }

        return arrayWithColumns;
    }


    ngAfterViewInit() {
    }
}
