import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnChanges, SimpleChanges, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PanelService } from 'src/app/servicios/panel.service';
import { NeumaticosService} from 'src/app/servicios/neumaticos/neumaticos.service'


@Component({
	selector: 'app-tabla-especial',
	templateUrl: './tabla-especial.component.html',
	styleUrls: ['./tabla-especial.component.scss']
})
export class TablaEspecialComponent implements OnInit, OnChanges {
	@Output() filterObjectData = new EventEmitter();

	@Input() columnsData: any
	@Input() dataSource:any
	@Input() dataHeaders: any
	@ViewChild('basicmodal') basicmodal:any
	@ViewChild('basicmodaldos') basicmodaldos:any
	panelIsOpen:boolean = false
	requestMilimetraje:any
	@ViewChild(MatPaginator) paginator!: MatPaginator
	myPreloader: boolean = true
	dataSourceArray:MatTableDataSource<any>

	pillFilterOptions: string[] = ['Region','LastMeasure'];
	pillJSON:any;
	pillsFilter:any = []

	filterObject = {
		"Year": 0,
		"Week": 0,
		"STARTDATE": "",
		"ENDDATE": "",
		"Month": 0,
		"Cedis": "BAAG",
		"RegionList": [  ],
		"EcoIdentifier": "",
		"StartLastMeasureDate": "",
		"EndLastMeasureDate": ""
	};

	panelObject = {
		panel: "",
		data: {
			Eco: '',
			Identifier: '',
			Cedis: 'BAAG'
		}
	}

	constructor(
		private sideNavService: PanelService,
		private neumaticosService: NeumaticosService,
		) {
	}

	ngOnChanges(changes: SimpleChanges) {
		//console.log(changes['dataSource'].currentValue); 
		this.dataSourceArray = new MatTableDataSource(changes['dataSource'].currentValue)
		
		this.delayPaginator()
	  }  

	setTable(){
		this.myPreloader = false;
		this.dataSourceArray = new MatTableDataSource(this.dataSource)
		this.delayPaginator()

	}

	ngOnInit(): void {
		//console.log(this.dataSource)
		//console.log(this.columnsData)
		this.setTable()
	}


	openSidebar(element){

		this.panelObject = {
			panel: "usoDetalle",
			data: {
				Eco: element.Eco,
				Identifier: element.VehicleIdentifier,
				Cedis: 'BAAG'
			}
		}

		this.sideNavService.toggle(this.panelObject);
	}


	openSidebarEdit(element){

		this.panelObject = {
			panel: "usoEdicion",
			data: {
				Eco: element.Eco,
				Identifier: element.VehicleIdentifier,
				Cedis: 'BAAG'
			}
		}

		this.sideNavService.toggle(this.panelObject);
	}



	// Esta función va junto con el componente de filtro de búsqueda.
    readingFilter(e){
        this.dataSourceArray.filter = e;
    }

	//Filtro de pastillas
	pillFilter(mode){

		let singlePill = {"Mode": "",
						  "Options": []}


		this.neumaticosService.getFilterCatalog({"SectionName": mode, "Cedis": 'BAAG'}).subscribe({
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
		this.filterObjectData.emit(this.filterObject)
	}
	dateRecall($event){
		this.filterObject.StartLastMeasureDate = $event[0];
		this.filterObject.EndLastMeasureDate = $event[1];
		this.filterObjectData.emit(this.filterObject)
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
		this.filterObject.RegionList = value;
		this.filterObjectData.emit(this.filterObject)
	}

	delayPaginator(){
		setTimeout(() => {
			this.dataSourceArray.paginator = this.paginator
			this.paginator._intl.firstPageLabel = "Primera página"
			this.paginator._intl.itemsPerPageLabel = "Registros por página"
			this.paginator._intl.nextPageLabel = "Página siguiente"
			this.paginator._intl.previousPageLabel = "Página anterior"
			this.paginator._intl.lastPageLabel = "Ultima página"
		}, 100);
	}

	deletePillFilter($event){
		//console.log($event.target.id)

		var found = this.pillsFilter.find(e => e.Mode === $event.target.id);

		var deleted = this.pillsFilter.splice(this.pillsFilter.indexOf(found),1)
		this.updatefilterObject($event.target.id)
		
	}

	updatefilterObject(mode:string){
		switch(mode) { 
			case 'Eco': { 
			   this.filterObject.EcoIdentifier = "";
			   break; 
			} 
			case 'Region': { 
				this.filterObject.RegionList = [];
			   break; 
			} 
			case 'LastMeasure': { 
				this.filterObject.StartLastMeasureDate =  ""
				this.filterObject.EndLastMeasureDate = "";
			   break; 
			} 
			default: { 
			   //statements; 
			   break; 
			} 
		 } 

		 this.filterObjectData.emit(this.filterObject)
	}
}
