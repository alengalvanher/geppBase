import { Component, Input, OnInit, NgZone, ViewChild } from '@angular/core';
import { InventarioService } from "../../../../servicios/inventario/inventario.service"
import { ConsultaDetalleService } from '../..//servicios/consulta-detalle.service';
import { NeumaticosService } from "../../../../servicios/neumaticos/neumaticos.service"
import { PanelService } from '@servicios/panel.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {
	@ViewChild('modalTraspasarPasoUno') modalTraspasarPasoUno:any;
	
	openPanel: boolean = false;
	Identifier:string;
	Status:string;
	detailData: any = {};
	detailTyreData: any = {};
	updateTyreData:any = {};
	errorMsg: string = '';


	constructor(
		private _panelService:PanelService,
		private inventarioService: InventarioService,
		private neumaticosService: NeumaticosService,
		private _consultaDetalleService:ConsultaDetalleService,
		private _ngzone :NgZone,
		private modalService: NgbModal,
		) {
			this._consultaDetalleService.Identifier.subscribe(identifier => {
				//console.log(this.openPanel)
				this.Identifier = identifier[0];
				console.log(this.Identifier, 'constructor')
				this.getVehicleDetail(identifier[0])
				this.Status = identifier[1]
			})

	}

	getVehicleDetail(id){
		this.inventarioService.getInventoryDetail(id).subscribe( response => {

			this._ngzone.run(() =>{
				this.detailData = response.VehicleDetail;
				this.openPanel = true
				//console.log(this.openPanel)
			})
			//console.log(this.detailData, 'getV')
		})
	}
	closePanel(){
		this.openPanel = false
		//console.log(this.openPanel)
	}

	detalleNuematicos(eco: string, id: string, cedis: string) {
		console.log(eco, id, cedis)
		let data2send = 
			// {
			// 	"Eco": eco,
			// 	"Identifier": id,
			// 	"Cedis": cedis
			// }
			{
				"Eco": "6074UC",
				"Identifier": "2768ded4-d40b-4466-a928-b7093cdcc31e",
				"Cedis": "BAAG"
			}
		
		this.neumaticosService.getTireInventoryDetail(data2send).subscribe( response => {

			console.log(response)
			if(response["Success"] === false){
				this.errorMsg = response["Message"]
			}else {
				this.detailTyreData = response["VehicleTires"]
				this.updateTyreData = response["TireUpdateInformation"]
			}
		})
		this.modalService.open(this.modalTraspasarPasoUno, { centered: true, size: 'lg'});

	}

	openSidebar(eco: string, id: string, cedis: string){

		let panelObject = {
			panel: "usoDetalle",
			data: 
			// {
			// 	"Eco": eco,
			// 	"Identifier": id,
			// 	"Cedis": cedis
			// }
			{
				"Eco": "6074UC",
				"Identifier": "2768ded4-d40b-4466-a928-b7093cdcc31e",
				"Cedis": "BAAG"
			}
		}
		this.modalService.dismissAll();
		this._panelService.toggle(panelObject);
	}
}
