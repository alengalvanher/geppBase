import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-table-header-element',
	templateUrl: './table-header-element.component.html',
	styleUrls: ['./table-header-element.component.scss']
})
export class TableHeaderElementComponent implements OnInit {
	@Input() elements:any;
	
	constructor() { }

	ngOnInit(): void {
	}

}
