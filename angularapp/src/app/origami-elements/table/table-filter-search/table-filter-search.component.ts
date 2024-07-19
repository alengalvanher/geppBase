import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-table-filter-search',
    templateUrl: './table-filter-search.component.html',
    styleUrls: ['./table-filter-search.component.scss']
})
export class TableFilterSearchComponent implements OnInit {
    @Output() filter = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {
    }


    applyFilter(event: Event) {
        console.log( (event.target as HTMLInputElement).value );
        const filterValue = (event.target as HTMLInputElement).value;

        this.filter.emit(filterValue.toLowerCase());
    }
}
