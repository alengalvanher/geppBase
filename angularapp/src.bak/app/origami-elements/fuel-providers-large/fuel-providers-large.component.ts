import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fuel-providers-large',
  templateUrl: './fuel-providers-large.component.html',
  styleUrls: ['./fuel-providers-large.component.scss']
})
export class FuelProvidersLargeComponent implements OnInit {

    @Input() objeto:any = [];

	constructor() {

	}

	ngOnInit(): void {
	}

	ngAfterViewInit(){
		console.log("Objeto recibido ", this.objeto);
	}

}
