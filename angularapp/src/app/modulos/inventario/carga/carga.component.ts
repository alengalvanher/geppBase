import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CargadearchivosService } from "@servicios/carga/cargadearchivos.service";
import { InventarioService } from "@servicios/inventario/inventario.service"


@Component({
	selector: 'app-carga',
	templateUrl: './carga.component.html',
	styleUrls: ['./carga.component.scss']
})
export class CargaComponent {
	// ------------------- CARGA ----------------------------------
	@ViewChild('successAlert') successAlert:any;
	@ViewChild('errorAlert') errorAlert:any;

	@ViewChild("fileUpload", { static: false }) fileUpload: ElementRef | undefined;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	
	files = [];
	myPreloader: boolean = false
	responseData:any

	cargaForm = new FormGroup({
		archivo: new FormControl(null)
	});
	// ------------------- CARGA ----------------------------------

	reportTablePanel:boolean = false
	panelTitle:string = ''
	displayedColumns: string[] = [ 'Status', 'Substatus', 'Económico', 'Información', 'Cbu', 'Región', 'Sitio', 'Póliza', 'Vigencia', 'Tag', 'Proveedor_de_combustible', 'Telemetría', 'Tipo_de_vehículo', 'Placa'];
	displayedColumnsReescribir: string[] = ['Status', 'Substatus', 'Económico', 'Información', 'Cbu', 'Región', 'Sitio', 'Póliza', 'Vigencia', 'Tag', 'Proveedor_de_combustible', 'Telemetría', 'Tipo_de_vehículo', 'Placa'];


	constructor(
		private cargaDeArchivos: CargadearchivosService,
		private inventarioService: InventarioService,
		private _ngbModal: NgbModal
		) {
	}

	getInventory(data2send){
		this.inventarioService.getInventory(data2send).subscribe({
			next: (response:any) => {
				this.responseData = new MatTableDataSource(response['VehicleInventaryList']);

				this.myPreloader = false;
				setTimeout(() => {
					this.responseData.paginator = this.paginator;
				}, 1);
				
				this.translatePaginator();
				
				//console.log("DATO REMOTO", response)
			},
			error: (error) => console.log("Error", error),
		})
	}

	downloadReport(){
		switch(this.panelTitle) { 
			case "Historial de posiciones": { 
			   
			   
			   return {}
			   break; 
			} 
			case "KM transcurridos": { 
				
				return {}
			   break; 
			} 
			case "Eventos de manejo": { 
				
				return {}
			   break; 
			} 
			case "Tiempo en planta": { 
				
				return {}
			   break; 
			} 
			default: { 
			   //statements;
			   return {} 
			   break; 
			} 
		 } 
	}

	switchReport(idSelector){
		switch(idSelector) { 
			case 1: { 
			   this.panelTitle = "Historial de posiciones"
			   
			   return {}
			   break; 
			} 
			case 2: { 
				this.panelTitle = "KM transcurridos"
				return {}
			   break; 
			} 
			case 3: { 
				this.panelTitle =  "Eventos de manejo"
				return {}
			   break; 
			} 
			case 4: { 
				this.panelTitle =  "Tiempo en planta"
				return {}
			   break; 
			} 
			default: { 
			   //statements;
			   return {} 
			   break; 
			} 
		 } 
	}

	reportPanelAppear(report){
		this.reportTablePanel = true
		this.responseData = this.switchReport(report)

		this.getInventory({})
	}
	reportPanelDisppear(){
		this.reportTablePanel = false
	}

	translatePaginator(){
		this.paginator._intl.firstPageLabel = "Primera página";
		this.paginator._intl.itemsPerPageLabel = "Registros por página";
		this.paginator._intl.nextPageLabel = "Página siguiente";
		this.paginator._intl.previousPageLabel = "Página anterior";
		this.paginator._intl.lastPageLabel = "Ultima página";
	}

	// ------------------- CARGA ----------------------------------
	enviarFormulario() {
		this.myPreloader = true;
		const fileUpload = this.fileUpload?.nativeElement;

		let archivo = {
			data: fileUpload.files[0],
			inProgress: false,
			progress: 0
		}

		this.enviarArchivo(archivo);
	}


	enviarArchivo(archivo:any) {
		const formData = new FormData();
		formData.append('file', archivo.data);
		archivo.inProgress = true;

		this.cargaDeArchivos.sendFormData(formData).subscribe({
			next: (response) => {
				console.log("Responses", response)

				if (response.Success == true) {
					this.myPreloader = false
					this.cargaForm.reset()
					this.responseData = response;
					this._ngbModal.open(this.successAlert, { centered: true, backdrop : 'static', keyboard : false });
				}
			},
			error: (error) => {
				console.log("error", error)

				this.myPreloader = false
				this._ngbModal.open(this.errorAlert, { centered: true, backdrop : 'static', keyboard : false });
			}
		});
	}

	modalDismiss(){
		this._ngbModal.dismissAll();
	}
}
