import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-number-card',
	templateUrl: './number-card.component.html',
	styleUrls: ['./number-card.component.scss']
})
export class NumberCardComponent implements OnInit {
	@Input() number:any;
	@Input() modal:any;
	color:string = '';

	colors = [
		"danger", "danger", "danger", "danger",
		"warning", "warning",
		"success", "success", "success", "success", "success", "success", "success", "success", "success", "success"
	]

	constructor() {

	}

	ngOnInit(): void {
	}

	ngAfterViewInit(){

	}
}
