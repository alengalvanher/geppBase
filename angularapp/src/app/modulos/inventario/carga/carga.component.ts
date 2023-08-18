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
	notFound: boolean = false
	responseData:any
	responseDataBackup:any
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
		"INITIALDATE": this.formatDate(new Date),
		"FINALDATE": ''
	}
	//KM Recorridos Filter
	formKMFilter = new FormGroup({
		Unidad: new FormControl(''),
	});
	//Tiempo en planta filter
	formPlantUptimeFilter = new FormGroup({
		Unidad: new FormControl(''),
		UnidadId: new FormControl(''),
		Zona: new FormControl(''),
	});
	//Historial de posiciones
	formPositionsHistoryFilter = new FormGroup({
		Unidad: new FormControl(''),
		Status: new FormControl(''),
		Codigo: new FormControl(''),
		Conductor: new FormControl(''),
		Posicion: new FormControl(''),
		GPS: new FormControl(''),
	});
	//Eventos de manejo
	formEventsFilter = new FormGroup({
		Agrupacion: new FormControl(''),
		Placa: new FormControl(''),
		Evento: new FormControl(''),
		Zona: new FormControl(''),
		TipoEvento: new FormControl(''),
		Status: new FormControl(''),
	});

	kmState:any
	unidadList:any 
	unidadIdList:any
	zonaList:any
	statusList:any
	codigoList:any
	conductorList:any
	posicionList:any
	GPSList:any
	agrupacionList:any
	placaList:any
	eventoList:any
	tipoEventoList:any

	disableDownload:boolean = false
	disableFilter:boolean = false
	firstLoad:number = 0
	errorMessage:string

	constructor(
		private cargaDeArchivos: CargadearchivosService,
		private inventarioService: InventarioService,
		private _ngbModal: NgbModal
		) {

			
			let today = new Date
			let yesterday = new Date(today.getTime() - (24*60*60*1000));
			let yesterday2 = new Date(yesterday.getTime() - (24*60*60*1000));

			this.initialDateObject.INITIALDATE = this.formatDate(yesterday2)+' 00:00:00'
			this.initialDateObject.FINALDATE = this.formatDate(today)+' 00:00:59'
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
		this.disableDownload = true
		switch(this.panelTitle) { 
			case "Historial de posiciones": { 
				let data2send = {
					"InitialDate": this.currentDate.INITIALDATE,
					"FinalDate": this.currentDate.FINALDATE,
					"Unit":  this.formPositionsHistoryFilter.value.Unidad == 'null' || this.formPositionsHistoryFilter.value.Unidad == '' ? null : this.formPositionsHistoryFilter.value.Unidad,
					"Status": this.formPositionsHistoryFilter.value.Status == 'null' || this.formPositionsHistoryFilter.value.Status == '' ? null : this.formPositionsHistoryFilter.value.Status,
					"Code": this.formPositionsHistoryFilter.value.Codigo == 'null' || this.formPositionsHistoryFilter.value.Codigo == '' ? null : this.formPositionsHistoryFilter.value.Codigo,
					"Driver":  this.formPositionsHistoryFilter.value.Conductor == 'null' || this.formPositionsHistoryFilter.value.Conductor == '' ? null : this.formPositionsHistoryFilter.value.Conductor,
					"Location":  this.formPositionsHistoryFilter.value.Posicion == 'null' || this.formPositionsHistoryFilter.value.Posicion == '' ? null : this.formPositionsHistoryFilter.value.Posicion,
					"GPS": this.formPositionsHistoryFilter.value.GPS == 'null' || this.formPositionsHistoryFilter.value.GPS == '' ? null : this.formPositionsHistoryFilter.value.GPS
				}
				this.inventarioService.GetPositionHistoryReport(data2send).subscribe({
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
						this.disableDownload = false
						console.log("Se descargó con éxito", data)
					},
					error: (error) => {
						this._ngbModal.open(this.errorAlert, { centered: true, backdrop : 'static', keyboard : false });
						console.log("Ocurrió un error", error)
						this.disableDownload = false
					},
					complete: () => {
						console.log("Se completó")
					}
				})
			   return {}
			   break; 
			} 
			case "KM transcurridos": { 
				let data2send = {
					"InitialDate": this.currentDate.INITIALDATE,
					"FinalDate": this.currentDate.FINALDATE,
					"Unit": this.formKMFilter.value.Unidad == 'null' || this.formKMFilter.value.Unidad == '' ? null : this.formKMFilter.value.Unidad,
				}
				this.inventarioService.GetOdometerReport(data2send).subscribe({
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
						
						setTimeout(() => {
							this.disableDownload = false
						}, 3000);
						console.log("Se descargó con éxito", data)
					},
					error: (error) => {
						console.log("Ocurrió un error", error)
						this.disableDownload = false
						this._ngbModal.open(this.errorAlert, { centered: true, backdrop : 'static', keyboard : false });
					},
					complete: () => {
						console.log("Se completó")
					}
				})
				return {}
			   break; 
			} 
			case "Eventos de manejo": { 
				let data2send = {
					"InitialDate": this.currentDate.INITIALDATE,
					"FinalDate": this.currentDate.FINALDATE,
					"Grouping": this.formEventsFilter.value.Agrupacion == 'null' ||this.formEventsFilter.value.Agrupacion == '' ? null : this.formEventsFilter.value.Agrupacion,
					"Plate": this.formEventsFilter.value.Placa == 'null' || this.formEventsFilter.value.Placa == '' ? null : this.formEventsFilter.value.Placa,
					"EventText": this.formEventsFilter.value.Evento == 'null' || this.formEventsFilter.value.Evento == '' ? null : this.formEventsFilter.value.Evento,
					"EventType": this.formEventsFilter.value.TipoEvento == 'null' || this.formEventsFilter.value.TipoEvento == '' ? null : this.formEventsFilter.value.TipoEvento,
					"Status": this.formEventsFilter.value.Status == 'null' || this.formEventsFilter.value.Status == '' ? null : this.formEventsFilter.value.Status
				}
				this.inventarioService.GetEventsReport(data2send).subscribe({
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
						this.disableDownload = false
						console.log("Se descargó con éxito", data)
					},
					error: (error) => {
						console.log("Ocurrió un error", error)
						this.disableDownload = false
						this._ngbModal.open(this.errorAlert, { centered: true, backdrop : 'static', keyboard : false });
					},
					complete: () => {
						console.log("Se completó")
					}
				})
				return {}
			   break; 
			} 
			case "Tiempo en planta": { 
				let data2send = {
					"InitialDate": this.currentDate.INITIALDATE,
					"FinalDate": this.currentDate.FINALDATE,
					"UnidadID": this.formPlantUptimeFilter.value.UnidadId == 'null' || this.formPlantUptimeFilter.value.UnidadId == '' ? null : this.formPlantUptimeFilter.value.UnidadId,
					"Unit": this.formPlantUptimeFilter.value.Unidad == 'null' || this.formPlantUptimeFilter.value.Unidad == '' ? null : this.formPlantUptimeFilter.value.Unidad,
					"ZoneName": this.formPlantUptimeFilter.value.Zona == 'null' || this.formPlantUptimeFilter.value.Zona == '' ? null : this.formPlantUptimeFilter.value.Zona,		
				}
				this.inventarioService.GetPlantUptimeReport(data2send).subscribe({
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
						this.disableDownload = false
						console.log("Se descargó con éxito", data)
					},
					error: (error) => {
						console.log("Ocurrió un error", error)
						this.disableDownload = false
						this._ngbModal.open(this.errorAlert, { centered: true, backdrop : 'static', keyboard : false });
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
			   let today = new Date
			   this.initialDateObject.INITIALDATE = this.formatDate(today)+' 00:00:00'
			   this.initialDateObject.FINALDATE = this.formatDate(today)+' 23:59:00'

			   this.currentDate = this.initialDateObject
			   this.inventarioService.GetPositionHistoryReportData(this.currentDate).subscribe({
				next: (response:any) => {
						if(response.Success ){
							
							this.responseData = new MatTableDataSource(response['PositionsHistory']);
							this.unidadList = this.distinct2select('Unit', response.PositionsHistory)
							this.statusList = this.distinct2select('Status', response.PositionsHistory)
							this.codigoList = this.distinct2select('Code', response.PositionsHistory)
							this.conductorList = this.distinct2select('Driver', response.PositionsHistory)
							this.posicionList = this.distinct2select('Position', response.PositionsHistory)
							this.GPSList = this.distinct2select('GPS', response.PositionsHistory)
		
							setTimeout(() => {
								this.responseData.paginator = this.paginator;
								this.translatePaginator()
								this.responseData.sort = this.sort;
								
							}, 1);
							this.myPreloader = false;
						} else {
							this.myPreloader = false;
							this.errorMessage = response.Message !== null ? response.Message : 'Hubo un problema, por favor intente más tarde.'
							this.responseData = new MatTableDataSource();
							this._ngbModal.open(this.errorAlert, { centered: true, backdrop : 'static', keyboard : false });
						}
					},
					error: (error) => console.log("Error", error),
				})
			   
			   return {}
			   break; 
			} 
			case 2: { 
				this.panelTitle = "KM transcurridos"
				this.inventarioService.GetOdometerReportData(this.currentDate).subscribe({
					next: (response:any) => {
							if(response.Success ){
								
								this.responseData = new MatTableDataSource(response['OdometerReport']);
								this.responseDataBackup = new MatTableDataSource(response['OdometerReport']);
								if(this.firstLoad == 0){
									//Llenar el select de los filtros con los registros únicos
									this.unidadList = this.distinct2select('Unit', response.OdometerReport)
								}
								setTimeout(() => {
									this.responseData.paginator = this.paginator;
									this.translatePaginator()
									this.responseData.sort = this.sort;
									
								}, 1);
								this.myPreloader = false;
								this.firstLoad += 1
							}else {
								this.myPreloader = false;
								this.errorMessage = response.Message !== null ? response.Message : 'Hubo un problema, por favor intente más tarde.'
								this.responseData = new MatTableDataSource();
								this._ngbModal.open(this.errorAlert, { centered: true, backdrop : 'static', keyboard : false });
							}
						},
						error: (error) => console.log("Error", error),
					})
				return {}
				break; 
			} 
			case 3: { 
				this.panelTitle =  "Eventos de manejo"
				this.inventarioService.GetEventsReportData(this.currentDate).subscribe({
					next: (response:any) => {
							if(response.Success ){
								
								this.responseData = new MatTableDataSource(response['Events']);
								this.agrupacionList = this.distinct2select('Grouping', response.Events)
								this.placaList = this.distinct2select('Plate', response.Events)
								this.eventoList = this.distinct2select('EventText', response.Events)
								this.zonaList = this.distinct2select('ZoneName', response.Events)
								this.tipoEventoList = this.distinct2select('EventType', response.Events)
								this.statusList = this.distinct2select('Status', response.Events)
			
								setTimeout(() => {
									this.responseData.paginator = this.paginator;
									this.translatePaginator()
									this.responseData.sort = this.sort;
									
								}, 1);
								this.myPreloader = false;
							}else {
								this.myPreloader = false;
								this.errorMessage = response.Message !== null ? response.Message : 'Hubo un problema, por favor intente más tarde.'
								this.responseData = new MatTableDataSource();
								this._ngbModal.open(this.errorAlert, { centered: true, backdrop : 'static', keyboard : false });
							}
						},
						error: (error) => console.log("Error", error),
					})
				return {}
			   break; 
			} 
			case 4: { 
				this.panelTitle =  "Tiempo en planta"
				this.inventarioService.GetPlantUptimeReportData(this.currentDate).subscribe({
					next: (response:any) => {
							if(response.Success ){
								
								this.responseData = new MatTableDataSource(response['PlantUptimes']);
								this.responseDataBackup = new MatTableDataSource(response['PlantUptimes']);
								//Llenar el select de los filtros con los registros únicos
								this.unidadList = this.distinct2select('Unit', response.PlantUptimes)
								this.unidadIdList = this.distinct2select('UnidadID', response.PlantUptimes)
								this.zonaList = this.distinct2select('ZoneName', response.PlantUptimes)

								setTimeout(() => {
									this.responseData.paginator = this.paginator;
									this.translatePaginator()
									this.responseData.sort = this.sort;
									
								}, 1);
								this.myPreloader = false;
							}else {
								this.myPreloader = false;
								this.errorMessage = response.Message !== null ? response.Message : 'Hubo un problema, por favor intente más tarde.'
								this.responseData = new MatTableDataSource();
								this._ngbModal.open(this.errorAlert, { centered: true, backdrop : 'static', keyboard : false });
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
	filterReport(){
		console.log('test click')
		switch(this.panelTitle){
			case "Historial de posiciones":{
				this.myPreloader = true

				let data2send = {
					"InitialDate": this.currentDate.INITIALDATE,
					"FinalDate": this.currentDate.FINALDATE,
					"Unit":  this.formPositionsHistoryFilter.value.Unidad == 'null' || this.formPositionsHistoryFilter.value.Unidad == '' ? null : this.formPositionsHistoryFilter.value.Unidad,
					"Status": this.formPositionsHistoryFilter.value.Status == 'null' || this.formPositionsHistoryFilter.value.Status == '' ? null : this.formPositionsHistoryFilter.value.Status,
					"Code": this.formPositionsHistoryFilter.value.Codigo == 'null' || this.formPositionsHistoryFilter.value.Codigo == '' ? null : this.formPositionsHistoryFilter.value.Codigo,
					"Driver":  this.formPositionsHistoryFilter.value.Conductor == 'null' || this.formPositionsHistoryFilter.value.Conductor == '' ? null : this.formPositionsHistoryFilter.value.Conductor,
					"Location":  this.formPositionsHistoryFilter.value.Posicion == 'null' || this.formPositionsHistoryFilter.value.Posicion == '' ? null : this.formPositionsHistoryFilter.value.Posicion,
					"GPS": this.formPositionsHistoryFilter.value.GPS == 'null' || this.formPositionsHistoryFilter.value.GPS == '' ? null : this.formPositionsHistoryFilter.value.GPS
				}
				this.inventarioService.GetPositionHistoryReportData(data2send).subscribe({
					next: (response:any) => {
							if(response.Success ){
								
								this.responseData = new MatTableDataSource(response['PositionsHistory']);
			
								setTimeout(() => {
									this.responseData.paginator = this.paginator;
									this.translatePaginator()
									this.responseData.sort = this.sort;
									
								}, 1);
								this.myPreloader = false;
							}else{
								this.myPreloader = true
								this.notFound= true
							}
						},
						error: (error) => console.log("Error", error),
					})
				return {}
				break; 
			}
			case "KM transcurridos":{
				this.disableFilter = true
				let data2send = {
					"InitialDate": this.currentDate.INITIALDATE,
					"FinalDate": this.currentDate.FINALDATE,
					"Unit": this.formKMFilter.value.Unidad == 'null' || this.formKMFilter.value.Unidad == '' ? null : this.formKMFilter.value.Unidad,
				}
				this.inventarioService.GetOdometerReportData(data2send).subscribe({
					next: (response:any) => {
							if(response.Success ){
								
								this.responseData = new MatTableDataSource(response['OdometerReport']);
								this.responseDataBackup = new MatTableDataSource(response['OdometerReport']);
								//Llenar el select de los filtros con los registros únicos
								//this.unidadList = this.distinct2select('Unit', response.OdometerReport)
								
								setTimeout(() => {
									this.responseData.paginator = this.paginator;
									this.translatePaginator()
									this.responseData.sort = this.sort;
									
								}, 1);
								setTimeout(() => {
									this.disableFilter = false
								}, 3000);
								this.myPreloader = false;
							}else {
								this.myPreloader = false;
								this.errorMessage = response.Message !== null ? response.Message : 'Hubo un problema, por favor intente más tarde.'
								this.responseData = new MatTableDataSource();
								this._ngbModal.open(this.errorAlert, { centered: true, backdrop : 'static', keyboard : false });
							}
						},
						error: (error) => console.log("Error", error),
					})
				return {}
				break; 
			}
			case "Eventos de manejo":{
				this.myPreloader = true
				
				let data2send = {
					"InitialDate": this.currentDate.INITIALDATE,
					"FinalDate": this.currentDate.FINALDATE,
					"Grouping": this.formEventsFilter.value.Agrupacion == 'null' ||this.formEventsFilter.value.Agrupacion == '' ? null : this.formEventsFilter.value.Agrupacion,
					"Plate": this.formEventsFilter.value.Placa == 'null' || this.formEventsFilter.value.Placa == '' ? null : this.formEventsFilter.value.Placa,
					"EventText": this.formEventsFilter.value.Evento == 'null' || this.formEventsFilter.value.Evento == '' ? null : this.formEventsFilter.value.Evento,
					"EventType": this.formEventsFilter.value.TipoEvento == 'null' || this.formEventsFilter.value.TipoEvento == '' ? null : this.formEventsFilter.value.TipoEvento,
					"Status": this.formEventsFilter.value.Status == 'null' || this.formEventsFilter.value.Status == '' ? null : this.formEventsFilter.value.Status
				}
				this.inventarioService.GetEventsReportData(data2send).subscribe({
					next: (response:any) => {
							if(response.Success ){
								
								this.responseData = new MatTableDataSource(response['Events']);
			
								setTimeout(() => {
									this.responseData.paginator = this.paginator;
									this.translatePaginator()
									this.responseData.sort = this.sort;
									
								}, 1);
								this.myPreloader = false;
							}else{
								this.myPreloader = true
								this.notFound= true
							}
						},
						error: (error) => console.log("Error", error),
					})

				console.log(data2send)
				return {}
				break; 
			}
			case "Tiempo en planta":{
				this.myPreloader = true
				
				let data2send = {
					"InitialDate": this.currentDate.INITIALDATE,
					"FinalDate": this.currentDate.FINALDATE,
					"UnidadID": this.formPlantUptimeFilter.value.UnidadId == 'null' || this.formPlantUptimeFilter.value.UnidadId == '' ? null : this.formPlantUptimeFilter.value.UnidadId,
					"Unit": this.formPlantUptimeFilter.value.Unidad == 'null' || this.formPlantUptimeFilter.value.Unidad == '' ? null : this.formPlantUptimeFilter.value.Unidad,
					"ZoneName": this.formPlantUptimeFilter.value.Zona == 'null' || this.formPlantUptimeFilter.value.Zona == '' ? null : this.formPlantUptimeFilter.value.Zona,		
				}
				this.inventarioService.GetPlantUptimeReportData(data2send).subscribe({
					next: (response:any) => {
							if(response.Success ){
								
								this.responseData = new MatTableDataSource(response['PlantUptimes']);
								this.responseDataBackup = new MatTableDataSource(response['PlantUptimes']);
								

								setTimeout(() => {
									this.responseData.paginator = this.paginator;
									this.translatePaginator()
									this.responseData.sort = this.sort;
									
								}, 1);
								this.myPreloader = false;
							}else{
								this.myPreloader = true
								this.notFound= true
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
		//console.log(objeto)
		this.currentDate = {
			"INITIALDATE": objeto.StartDate+' '+objeto.StartTime.hour+':'+objeto.StartTime.minute,
			"FINALDATE": objeto.EndDate+' '+objeto.EndTime.hour+':'+objeto.EndTime.minute
		}
		
		//this.switchReport(this.currentReport)
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
	//-------------------- Filtros  -------------------------------
	//Unique keys 
	distinct2select(key, response){
		return [... new Set(response.map(x=>x[key]))]
	}
	//KM Recorridos
	onChangeUnidad($event: any){
		//console.log($event.target.value)
		this.kmState = $event.target.value.trim().toLowerCase();
		
	  }	
	
	onChangePlantUptime($event: any){
		
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
