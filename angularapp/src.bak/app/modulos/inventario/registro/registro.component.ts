import { Component, NgZone, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import { FormularioService } from '../servicios/formulario.service';


@Component({
	selector: 'app-registro',
	templateUrl: './registro.component.html',
	styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, OnDestroy {
	@ViewChild('simpleAlert') simpleAlert: any;
	responseData: any;

	VehicleIdentifier: string;
	isEditing: boolean = false;
	suscripcion: any;

	myPreloader: boolean = false;
	paso = "paso1";


	// Dejado solo para observación, borrar después
	formInventary: any = {
		Cbu: null,
		Agency: null,
		CompanyInformation: null,
		OperativeInformation: {
			ManagementInformation: null,
			TireInformation: null,
			LeasingInformation: null,
			InsuranceInformation: null,
			StandInformation: null,
			FuelInformation: null,
			TelemetryInformation: null
		},
		FinancialInformation: {
			AssetInformation: null
		},
		ComplementsInformation: {
			Complements: null
		}
	};



	constructor(
		private _activatedRoute: ActivatedRoute
	) {

		this._activatedRoute.queryParams.subscribe(data => {
			if (data['Eco']) {
				this.paso = "paso2";
			} else {
				this.paso = "paso1";
			}
		})
		
	}


	goToStepTwo() {
		this.paso = "paso2";
	}

	ngOnInit() {
	}

	ngOnDestroy(){
		localStorage.setItem('Editando', 'false')
	}

	successConfirm() {
		this.paso = "paso2";
	}
}
