import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Servicios
import { PanelService } from '@servicios/panel.service';
import { CargadearchivosService } from "@servicios/carga/cargadearchivos.service";
import { InventarioService } from "@servicios/inventario/inventario.service"
import { ConsultaDetalleService } from '../servicios/consulta-detalle.service';


export interface inventarioData {
	Identifier: string;
    Status: string;
    Eco: string;
    StatusInformation: string;
	SubStatus: string;
    Cbu: string;
    Region: string;
    Site: string;
    Policy: string;
    Validity: string;
    Tag: string;
    CombSupplier: string;
    VehicleType: string;
    Plate: string;
    TelemetryStatus: string;
}



@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-consulta',
	templateUrl: './consulta.component.html',
	styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
	rawData:any
	myPreloader:boolean = true;
	dataInventory!: MatTableDataSource<inventarioData>;
	displayedColumns: string[] = ['Id', 'Status', 'Substatus', 'Económico', 'Información', 'Cbu', 'Región', 'Sitio', 'Póliza', 'Vigencia', 'Tag', 'Proveedor_de_combustible', 'Telemetría', 'Tipo_de_vehículo', 'Placa'];
	displayedColumnsReescribir: string[] = ['Status', 'Substatus', 'Económico', 'Información', 'Cbu', 'Región', 'Sitio', 'Póliza', 'Vigencia', 'Tag', 'Proveedor_de_combustible', 'Telemetría', 'Tipo_de_vehículo', 'Placa'];
	pillFilterOptions: string[] = ['Status','Substatus','Cbu','Region','Vigencia'];
	theCounter;
	filtrosAprovadosTemplate:any;
	dataBody:any;

	pillJSON:any;

	// EXCEL
	worksheet;


	@ViewChild('modalIncompleto') modalIncompleto: any;


	// Flujo Modales
	@ViewChild('modalTraspasarPasoUno') modalTraspasarPasoUno:any;
	@ViewChild('flujoCambioStatus') flujoCambioStatus:any;
	@ViewChild('detalleNeumaticos') detalleNeumaticos:any;


	@ViewChild('modalHistorico') modalHistorico:any;

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	vehicle: any;
	openPanelFlag: boolean = false
	openHistoricPanel: boolean = false
	modalHeaderData: any = [];
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;
	informationProgress: any = {}
	informationProgressHeader: any = []
	idVehicle:string;
	lastUpdateDate:any;

	topbarCBU:string

	pillsFilter:any = []

	filterObject = {
		"StatusIdentifier": "",
		"SubStatusIdentifier": "",
		"CbuList": [],
		"StartDate": "",
		"EndDate": ""
	};



	tableDisplay = this._formBuilder.group({
		// Actions: true,
		Status: true,
		Eco: true,
		StatusInformation: true,
		SubStatus: true,
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

	serviceName: any;

	constructor(
		private modalService: NgbModal,
		private _formBuilder: FormBuilder,
		private _panelService:PanelService,
		private servicio: CargadearchivosService,
		private inventarioService: InventarioService,
		private _detailShareService: ConsultaDetalleService,
		private router: Router,
		private sideNavService: PanelService
		) {
		this.topbarCBU = localStorage.getItem('cbu')

		this.getInventory({"CbuList": [this.topbarCBU]})
	}

	ngOnInit(): void {
	}
	getInventory(data2send){

		this.inventarioService.getInventory(data2send).subscribe({
			next: (response:any) => {


				this.dataInventory = new MatTableDataSource(response['VehicleInventaryList']);

				this.rawData = response['VehicleInventaryList']

				this.myPreloader = false;
				this.dataInventory.paginator = this.paginator;
				this.translatePaginator();
				this.lastUpdateDate = response.LastUpdate
				//console.log("DATO REMOTO", response)
			},
			error: (error) => console.log("Error", error),
		})
	}


	// Retorna los indices disponibles.
	getIndices(data){
		let indices = []
		let item = data.filteredData[0];

		for (const [key, value] of Object.entries(item)) {
			indices.push(key)
		}

		return indices
	}


	filterDuplicates(arr) {

		var counter = {};
		for (var i = 0; i < arr.length; i += 1) {
			counter[arr[i].Region] = (counter[arr[i].Region] || 0) + 1;
		}

		this.theCounter = counter;


		for (var key in counter) {

			if (counter[key] > 1) {
				// console.log("we have ", key, " duplicated ", counter[key], " times");
			}
		}

		// return nuevo
	}


	contadorDeDuplicados(counter){
		var count = 0;

		for(var prop in counter) {
			if(counter.hasOwnProperty(prop))
				++count;
		}

		return count;
	}


	counterDuplicates(arr, field){
		var counter = {};

		for (var i = 0; i < arr.length; i += 1) {
			counter[arr[i][field]] = (counter[arr[i][field]] || 0) + 1;
		}

		return counter;
	}


	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataInventory.filter = filterValue.trim().toLowerCase();
	  }

	translatePaginator(){
		this.paginator._intl.firstPageLabel = "Primera página";
		this.paginator._intl.itemsPerPageLabel = "Registros por página";
		this.paginator._intl.nextPageLabel = "Página siguiente";
		this.paginator._intl.previousPageLabel = "Página anterior";
		this.paginator._intl.lastPageLabel = "Ultima página";
	}


	BasicOpen(basicmodal: any) {
		this.modalService.open(basicmodal, { size: 'lg' });
	}

	async openDetail(element:any, basicmodal:any) {
		this.vehicle = element;
		this.modalService.open(basicmodal, { size: 'lg' });
	}

	ngAfterViewInit() {

	}


	editar(element,event) {
		event.stopPropagation()
		localStorage.setItem('VehicleIdentifier', element.Identifier)
		localStorage.setItem('Eco', element.Eco)
		localStorage.setItem('Editando', 'true')
		this.router.navigate(['/inventario/registro'], { queryParams: { Eco: element.Eco } })
	}

	historico(element) {
		this.modalHeaderData = [element.Eco, element.Cbu, element.Region, element.Site, element.VehicleType, element.Identifier]
		this.openHistoricPanel = true
		//this.modalService.open(this.modalHistorico, { centered: true, windowClass: 'ancho780' });
	}
	closeHistorico($event: any){
		this.openHistoricPanel = $event
	}

	traspasar(element) {
		this.modalHeaderData = [element.Eco, element.Cbu, element.Region, element.Site, element.VehicleType, element.Identifier]
		this.modalService.open(this.modalTraspasarPasoUno, { centered: true});
	}



	detalle() {
		//console.log("Detalle");
	}

	nuevaSolicitud(){
        // this.modalService.open(this.mymodal, { centered: true,size: 'lg'});
    }

    incompleto(identifier,details){
		//console.log(identifier)
		this.informationProgressHeader = details
		this.inventarioService.getStatusInformationProgress(identifier).subscribe({
			next: (response:any) => {
				this.informationProgress = response
        		//console.log('infoprogress',this.informationProgress)
				this.modalService.open(this.modalIncompleto, { centered: true, size: 'lg' });

			},
			error: (error) => console.log("Error", error),
		})
    }
	closeModalViaEvent($event: any){
		this.myPreloader = true;
		if($event === 'status'){
			this.getInventory({})
			this.modalService.dismissAll(this.flujoCambioStatus);
		} if( $event === 'traspaso'){
			this.getInventory({})
			this.modalService.dismissAll(this.modalTraspasarPasoUno);
		}
	}
    accept(modal:any) {
		modal.close();
	}
	//Minimodal para el substatus
	cargarSubStatus(identifier, status){
		this.idVehicle = identifier
		//console.log(identifier, status,'mouseover')

		this._detailShareService.changeIdentifier4substatus([identifier, status])
	}

	//Funciones para cargar el detalle, abrir y cerrar el panel lateral
	cargarDetalle(identifier, status){
		//console.log(identifier)
		this._detailShareService.changeIdentifier([identifier, status])
		this.openPanelFlag = true
	}
	cerrarPanel(){
		this.openPanelFlag = false
	}
	cargarDetalleNeumaticos() {
		this.modalService.open(this.detalleNeumaticos, { centered: true,size: 'lg'});
	}


	// Esta función va junto con el componente filtro de columnas
    renderColumns($event){
        this.displayedColumns = $event;
    }

    // Esta función va junto con el componente de filtro de búsqueda.
    readingFilter(e){
        this.dataInventory.filter = e;
    }

	//Filtro de pastillas
	pillFilter(mode){

		let singlePill = {"Mode": "",
						  "Options": []}


		this.inventarioService.getFilterCatalog({"SectionName": mode}).subscribe({
			next: (response:any) => {

        		//console.log('filtro pastilla', response)
				this.pillJSON = response.Options

				singlePill.Mode = mode
				singlePill.Options = response.Options

				this.pillsFilter.push(singlePill)
				//console.log(this.pillsFilter)
			},
			error: (error) => console.log("Error", error),
		})

    }

	readPill($event){
		this.filterObject[$event.target.id.split('-')[1].concat('Identifier')] = $event.target.value
		this.getInventory(this.filterObject)
	}
	dateRecall($event){
		this.filterObject.StartDate = $event[0];
		this.filterObject.EndDate = $event[1];
		this.getInventory(this.filterObject)
	}
	dateRecallMultiSelect($event){
		//console.log($event,'evento',this.pillJSON)
		let value = []
		this.pillJSON.forEach(function (item) {
			if($event.includes(item.Text)){
				value.push(item.Value)
			}
		});
		//console.log(value)
		this.filterObject.CbuList = value;
		this.getInventory(this.filterObject)
	}

	deletePillFilter($event){
		//console.log($event.target.id)

		var found = this.pillsFilter.find(e => e.Mode === $event.target.id);

		var deleted = this.pillsFilter.splice(this.pillsFilter.indexOf(found),1)
		this.updatefilterObject($event.target.id)

	}

	updatefilterObject(mode:string){
		//console.log(mode)
		switch(mode) {
			case 'Status': {
			   this.filterObject.StatusIdentifier = "";
			   break;
			}
			case 'SubStatus': {
				this.filterObject.SubStatusIdentifier = "";
			   break;
			}
			case 'Región': {
				this.filterObject.CbuList =  []
			   break;
			}
			case 'Vigencia': {
				this.filterObject.StartDate =  ""
				this.filterObject.EndDate = "";
			   break;
			}
			default: {
			   //statements;
			   break;
			}
		 }

		 this.getInventory(this.filterObject)
	}

	openSidebar(element){

		let panelObject = {
			panel: "usoDetalle",
			data: {
				Eco: element.Eco,
				Identifier: element.VehicleIdentifier,
				Cedis: 'BAAG'
			}
		}

		this.sideNavService.toggle(panelObject);
	}
}
