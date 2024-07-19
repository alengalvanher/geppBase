import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-fuel-providers',
	templateUrl: './fuel-providers.component.html',
	styleUrls: ['./fuel-providers.component.scss']
})
export class FuelProvidersComponent implements OnInit {
	@Input() objeto:any = [];

	constructor() {

	}

	ngOnInit(): void {
	}

	ngAfterViewInit(){
		console.log("Objeto recibido ", this.objeto);
	}

}
