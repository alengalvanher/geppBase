import { Component, OnInit, NgZone } from '@angular/core';
import { InventarioService } from "../../../../servicios/inventario/inventario.service"
import { ConsultaDetalleService } from '../..//servicios/consulta-detalle.service';

@Component({
  selector: 'app-substatus',
  templateUrl: './substatus.component.html',
  styleUrls: ['./substatus.component.scss']
})
export class SubstatusComponent implements OnInit {

  
	Identifier:any;
	Status:string;
	subStatus: any = {};

  constructor(
		private inventarioService: InventarioService,
		private _consultaDetalleService:ConsultaDetalleService,
		private _ngzone :NgZone
		) {
			this._consultaDetalleService.IdentifierSubStatus.subscribe(identifier => {
        		
				this.Identifier = identifier[0];
				console.log(this.Identifier, 'constructor')
				this.getVehicleDetail(identifier[0])
				this.Status = identifier[1]
			})
			
	}
  getVehicleDetail(id){
		this.inventarioService.getVehicleSubStatus(id).subscribe( response => {
			if(response.Success){
        this._ngzone.run(() =>{
          this.subStatus = response.VehicleSubStatus;
        })
      }
		})
	}

  ngOnInit(): void {
  }

}
