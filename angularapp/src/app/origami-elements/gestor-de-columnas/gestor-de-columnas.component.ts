import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
	selector: 'app-gestor-de-columnas',
	templateUrl: './gestor-de-columnas.component.html',
	styleUrls: ['./gestor-de-columnas.component.scss']
})
export class GestorDeColumnasComponent implements OnInit {

	data = [
		{value:"Status",  viewValue:"Status"},
		{value:"Eco",  viewValue:"Eco"},
		{value:"StatusInformation",  viewValue:"StatusInformation"},
		{value:"Cbu",  viewValue:"Cbu"},
		{value:"Region",  viewValue:"Region"},
		{value:"Site",  viewValue:"Site"},
		{value:"Policy",  viewValue:"Policy"},
		{value:"Validity",  viewValue:"Validity"},
		{value:"Tag",  viewValue:"Tag"},
		{value:"CombSupplier",  viewValue:"CombSupplier"},
		{value:"TelemetryStatus",  viewValue:"TelemetryStatus"},
		{value:"VehicleType",  viewValue:"VehicleType"},
		{value:"Plate",  viewValue:"Plate"}
	]



	tableDisplay = this._formBuilder.group({
		Actions: true,
		Status: true,
		Eco: true,
		StatusInformation: true,
		Cbu: true,
		Region: true,
		Site: true,
		Policy: true,
		Validity: true,
		Tag: true,
		CombSupplier: true,
		TelemetryStatus: true,
		VehicleType: true,
		Plate: true,
	});



	constructor(private _formBuilder: FormBuilder) {
		let nuevo = new FormControl("Status");
		// this.tableDisplay.addControl( "Status", nuevo )
	}

	ngOnInit(): void {
	}

}
