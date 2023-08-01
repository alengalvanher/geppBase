import { Component, OnInit, NgZone, OnDestroy, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InventarioService } from "../../../../servicios/inventario/inventario.service"
import { ConsultaDetalleService } from '../..//servicios/consulta-detalle.service';
import { FormularioService } from '../../servicios/formulario.service';

@Component({
  selector: 'app-traspaso-unidad',
  templateUrl: './traspaso-unidad.component.html',
  styleUrls: ['./traspaso-unidad.component.scss']
})
export class TraspasoUnidadComponent implements OnInit, OnDestroy{
  @Input() dataHeader: string;
  @Output() clickBack = new EventEmitter();
  
  RegionList: any;
  RegionText:any;
  RegionIdentifier:string;
  SiteList: any;
  Sitetext:any;
  

  Step:number = 1;
  

  formTransfer = new FormGroup({
    VehicleIdentifier: new FormControl(''),
    Eco: new FormControl(''),
		TransferDate: new FormControl('', [Validators.required]),
		Region: new FormControl('', [Validators.required]),
    Site: new FormControl({value: '', disabled : true}), 
    Reason:new FormControl('', [Validators.required])
	});

  constructor(
		private _inventarioService: InventarioService,
		private _ngzone :NgZone,
    private _formularioService:FormularioService

		) {	
      this._inventarioService.getCatalog('Company').subscribe(data => {
        this.RegionList = data['RegionList'];
        
      })
     }
  
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    console.log('destroy')
    // this._consultaDetalleService.Data4tansfer.unsubscribe();
  }

  ngOnInit(): void {
   
  }
  onChange($event: any) {
    this.Sitetext = $event.target.options[$event.target.options.selectedIndex].text;
  }
  onChangeRegion($event: any){
    this.RegionText = $event.target.options[$event.target.options.selectedIndex].text;
    this.RegionIdentifier = $event.target.value
    this._inventarioService.getSitesByRegion(this.RegionIdentifier).subscribe({
			next: (response:any) => {
        console.log(response)
        if(response.Success === true){
          this.formTransfer.controls.Site.enable();
				  this.SiteList = response['SitesList'];
          if(response['SitesList'].length == 0 ){
            console.log('sin sitio')
            this.formTransfer.value.Site = ''
          }
        }
        else{
          this.SiteList = []
          this.formTransfer.controls.Site.disable();
          this.formTransfer.value.Site = ''
          console.log("Error")
        }

			},
			error: (error) => console.log("Error de servidor", error),
		})
  }
  //Boton cancelar
  cancel(closemodal:boolean) {
		
	}
  //Boton aceptar
  sendTransfer(){
    this.Step = 2
    
  }

  back2stepOne(){
    this.Step = 1
  }

  sendTransfer2server(){
    
    //YYYY-MM-DD
    this.formTransfer.value.TransferDate = this.formTransfer.value.TransferDate['year'] + '/' + this.formTransfer.value.TransferDate['month'] + '/' + this.formTransfer.value.TransferDate['day']
    this.formTransfer.value.VehicleIdentifier = this.dataHeader[5]
    this.formTransfer.value.Eco = this.dataHeader[0]
    if(this.SiteList  == 0 ){
      //console.log('sin sitio')
      this.formTransfer.value.Site = null
    }
    console.log(this.formTransfer.value)

    this._inventarioService.setVehicleTransfer(this.formTransfer.value).subscribe({
			next: (response:any) => {
        console.log(response)
        if(response.Success === true){
          this.Step = 3
        }
        else{
          
          console.log("Error")
        }

			},
			error: (error) => console.log("Error de servidor", error),
		})
  }
}
