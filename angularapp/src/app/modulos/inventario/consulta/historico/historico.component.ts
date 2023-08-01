import { Component, Input, Output , OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from "../../../../servicios/inventario/inventario.service"

export interface inventarioData {
  Id: string;
  MovementType: string;
  Status: string;
  MovementDate: string;
  MovementDetail: string;
  MovementDescription: string;
  Responsable: string;
  Approved: string;
}
@Injectable({
	providedIn: 'root'
})

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {
  @Input() dataHeader: string;
  @Output() clickBack = new EventEmitter();
  
  myPreloader:boolean = true;
	dataInventory!: MatTableDataSource<inventarioData>;
  filters: Array<string> = [];
	displayedColumns: string[] = ['Id', 'Tipo_de_movimiento', 'Status' ,'Fecha_de_movimiento', 'Detalle_de_movimiento', 'Descripción', 'Responsable', 'Aprobación'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  constructor(
		private inventarioService: InventarioService,
  ) { 
    
  }

  translatePaginator(){
		this.paginator._intl.firstPageLabel = "Primera página";
		this.paginator._intl.itemsPerPageLabel = "Registros por página";
		this.paginator._intl.nextPageLabel = "Página siguiente";
		this.paginator._intl.previousPageLabel = "Página anterior";
		this.paginator._intl.lastPageLabel = "Ultima página";

		//console.log("Paginator", this.paginator._intl);
	}

  ngOnInit(): void {
    //console.log(this.dataHeader)
    this.inventarioService.getVehicleHistory(this.dataHeader[0]).subscribe({
			next: (response:any) => {
				this.dataInventory = new MatTableDataSource(response['VehicleHistories']);
				this.myPreloader = false;
				//this.dataInventory.paginator = this.paginator;
				//this.translatePaginator();

        this.filters = response['VehicleHistories'].map(item => item.MovementType).filter((value, index, self) => self.indexOf(value) === index)
        //console.log(this.filters)
			},
			error: (error) => console.log("Error", error),
		})
  }

  // Esta función va junto con el componente filtro de columnas
  renderColumns($event){
    this.displayedColumns = $event;
  }

  // Esta función va junto con el componente de filtro de búsqueda.
  readingFilter(e){
      this.dataInventory.filter = e;
  }

  //Filtros de cabecera
  applyFilter(filterString) {
    //console.log(filterString);
    this.dataInventory.filter = filterString;

    
}
}
