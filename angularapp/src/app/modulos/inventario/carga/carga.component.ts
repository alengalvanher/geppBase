import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CargadearchivosService } from "@servicios/carga/cargadearchivos.service";
import { InventarioService } from "@servicios/inventario/inventario.service"
import { saveAs } from 'file-saver';


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
	@ViewChild(MatSort) sort: MatSort;
	
	files = [];
	myPreloader: boolean = true
	responseData:any
	currentDate:any

	cargaForm = new FormGroup({
		archivo: new FormControl(null)
	});
	// ------------------- CARGA ----------------------------------

	reportTablePanel:boolean = false
	panelTitle:string = ''
	currentReport:number = 0
	//Reporte Historial de Repeticiones
	displayedColumns1: string[] = [ 'Unit', 'ReportDate', 'ServerDate', 'Status', 'StatusAccordingToCode', 'Code', 'Speed', 'Driver', 'Position', 'Latitude', 'Longitude', 'Location', 'odometer', 'GPS','Subfleet'];
	displayedColumnsReescribir1: string[] = [ 'Unit', 'ReportDate', 'ServerDate', 'Status', 'StatusAccordingToCode', 'Code', 'Speed', 'Driver', 'Position', 'Latitude', 'Longitude', 'Location', 'odometer', 'GPS','Subfleet'];
	//Reporte KM transcurridos
	displayedColumns2: string[] = [ 'Unit', 'Subfleet', 'From', 'To', 'Kilometers'];
	displayedColumnsReescribir2: string[] = [ 'Unit', 'Subfleet', 'From', 'To', 'Kilometers'];
	//Reporte de tiempo en planta
	displayedColumns3: string[] = [ 'UnidadID', 'Unit', 'Start_time', 'End_time', 'ZoneName', 'TotalTimeInZone', 'SubFleet'];
	displayedColumnsReescribir3: string[] = [ 'UnidadID', 'Unit', 'Start_time', 'End_time', 'ZoneName', 'TotalTimeInZone', 'SubFleet'];
	//Reporte de tiempo en planta
	displayedColumns4: string[] = [ 'Grouping', 'Plate', 'Region', 'EventText', 'ZoneName', 'EventTime', 'EndTime', 'EndTime', 'Speed', 'Longitude', 'Latitude', 'Location', 'EventDuration', 'EventType', 'Status'];
	displayedColumnsReescribir4: string[] = [ 'Grouping', 'Plate', 'Region', 'EventText', 'ZoneName', 'EventTime', 'EndTime', 'EndTime', 'Speed', 'Longitude', 'Latitude', 'Location', 'EventDuration', 'EventType', 'Status'];;

	initialDateObject:any = {
		"InitialDate": this.formatDate(new Date),
		"FinalDate": ''
	}

	constructor(
		private cargaDeArchivos: CargadearchivosService,
		private inventarioService: InventarioService,
		private _ngbModal: NgbModal
		) {

			
			let today = new Date
			let yesterday = new Date(today.getTime() - (24*60*60*1000));
			let yesterday2 = new Date(yesterday.getTime() - (24*60*60*1000));

			this.initialDateObject.FinalDate = this.formatDate(yesterday2)
			console.log(this.initialDateObject)

			this.currentDate = this.initialDateObject
	}

	getInventory(data2send){
		this.inventarioService.getInventory(data2send).subscribe({
			next: (response:any) => {
				this.responseData = new MatTableDataSource(response['VehicleInventaryList']);

				this.myPreloader = false;
				setTimeout(() => {
					this.responseData.paginator = this.paginator;
					this.responseData.sort = this.sort;
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
				this.inventarioService.GetPositionHistoryReport({}).subscribe({
					next: (data) => {
						let nombreArchivo = "ReporteHistorialDePosiciones.xlsx"
						const contentDisposition = data.headers.get('Content-Disposition')
		
						if (contentDisposition) {
							const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
							const matches = fileNameRegex.exec(contentDisposition);
							if (matches != null && matches[1]) {
								nombreArchivo = matches[1].replace(/['"]/g, '');
							}
						}
		
						saveAs(data.body, nombreArchivo);
		
						console.log("Se descargó con éxito", data)
					},
					error: (error) => {
						console.log("Ocurrió un error", error)
					},
					complete: () => {
						console.log("Se completó")
					}
				})
			   
			   return {}
			   break; 
			} 
			case "KM transcurridos": { 
				this.inventarioService.GetOdometerReport({}).subscribe({
					next: (data) => {
						let nombreArchivo = "ReporteKMRecorridos.xlsx"
						const contentDisposition = data.headers.get('Content-Disposition')
		
						if (contentDisposition) {
							const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
							const matches = fileNameRegex.exec(contentDisposition);
							if (matches != null && matches[1]) {
								nombreArchivo = matches[1].replace(/['"]/g, '');
							}
						}
		
						saveAs(data.body, nombreArchivo);
		
						console.log("Se descargó con éxito", data)
					},
					error: (error) => {
						console.log("Ocurrió un error", error)
					},
					complete: () => {
						console.log("Se completó")
					}
				})
				return {}
			   break; 
			} 
			case "Eventos de manejo": { 
				this.inventarioService.GetEventsReport({}).subscribe({
					next: (data) => {
						let nombreArchivo = "ReporteDeEventos.xlsx"
						const contentDisposition = data.headers.get('Content-Disposition')
		
						if (contentDisposition) {
							const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
							const matches = fileNameRegex.exec(contentDisposition);
							if (matches != null && matches[1]) {
								nombreArchivo = matches[1].replace(/['"]/g, '');
							}
						}
		
						saveAs(data.body, nombreArchivo);
		
						console.log("Se descargó con éxito", data)
					},
					error: (error) => {
						console.log("Ocurrió un error", error)
					},
					complete: () => {
						console.log("Se completó")
					}
				})
				return {}
			   break; 
			} 
			case "Tiempo en planta": { 
				this.inventarioService.GetPlantUptimeReport({}).subscribe({
					next: (data) => {
						let nombreArchivo = "ReporteTiempoEnPlanta.xlsx"
						const contentDisposition = data.headers.get('Content-Disposition')
		
						if (contentDisposition) {
							const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
							const matches = fileNameRegex.exec(contentDisposition);
							if (matches != null && matches[1]) {
								nombreArchivo = matches[1].replace(/['"]/g, '');
							}
						}
		
						saveAs(data.body, nombreArchivo);
		
						console.log("Se descargó con éxito", data)
					},
					error: (error) => {
						console.log("Ocurrió un error", error)
					},
					complete: () => {
						console.log("Se completó")
					}
				})
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
		this.currentReport = idSelector
		switch(idSelector) { 
			case 1: { 
			   this.panelTitle = "Historial de posiciones"
			   this.inventarioService.GetPositionHistoryReportData({}).subscribe({
				next: (response:any) => {
						if(response.Success ){
							
							this.responseData = new MatTableDataSource(response['PositionsHistory']);
		
							setTimeout(() => {
								this.responseData.paginator = this.paginator;
								this.translatePaginator()
								this.responseData.sort = this.sort;
								
							}, 1);
							this.myPreloader = false;
						}
					},
					error: (error) => console.log("Error", error),
				})
			   
			   return {}
			   break; 
			} 
			case 2: { 
				this.panelTitle = "KM transcurridos"
				this.inventarioService.GetOdometerReportData({}).subscribe({
					next: (response:any) => {
							if(response.Success ){
								
								this.responseData = new MatTableDataSource(response['OdometerReport']);
			
								setTimeout(() => {
									this.responseData.paginator = this.paginator;
									this.translatePaginator()
									this.responseData.sort = this.sort;
									
								}, 1);
								this.myPreloader = false;
							}
						},
						error: (error) => console.log("Error", error),
					})
				return {}
				break; 
			} 
			case 3: { 
				this.panelTitle =  "Eventos de manejo"
				this.inventarioService.GetEventsReportData({}).subscribe({
					next: (response:any) => {
							if(response.Success ){
								
								this.responseData = new MatTableDataSource(response['Events']);
			
								setTimeout(() => {
									this.responseData.paginator = this.paginator;
									this.translatePaginator()
									this.responseData.sort = this.sort;
									
								}, 1);
								this.myPreloader = false;
							}
						},
						error: (error) => console.log("Error", error),
					})
				return {}
			   break; 
			} 
			case 4: { 
				this.panelTitle =  "Tiempo en planta"
				this.inventarioService.GetPlantUptimeReportData({}).subscribe({
					next: (response:any) => {
							if(response.Success ){
								
								this.responseData = new MatTableDataSource(response['PlantUptimes']);
			
								setTimeout(() => {
									this.responseData.paginator = this.paginator;
									this.translatePaginator()
									this.responseData.sort = this.sort;
									
								}, 1);
								this.myPreloader = false;
							}
						},
						error: (error) => console.log("Error", error),
					})

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
		this.myPreloader = true
		
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
	receivingDate($event) {
		let objeto = $event;
		this.currentDate = {
			"InitialDate": this.formatDate(objeto.StartDate),
			"FinalDate": this.formatDate(objeto.EndDate)
		}
		this.switchReport(this.currentReport)
		
	}

	formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
	
		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
	
		return [year, month, day].join('-');
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
