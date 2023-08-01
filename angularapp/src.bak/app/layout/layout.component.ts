import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PanelService } from '@servicios/panel.service';



@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	@ViewChild('drawer') public drawer: MatSidenav | undefined;
	// Componentes IF
	usoDetalle: boolean = false;
	usoEdicion: boolean = false;
	consultaHistoricos: boolean = false;
	inventarioDetalle: boolean = false;

	// Necesario para el componente panel-uso-detalle
	dataUsoDetalle
	dataUsoEdicion

	constructor(
		private _panelService: PanelService,
	) {
	}


	ngOnInit(): void {
		this._panelService.sideNavToggleSubject.subscribe((response) => {

			if (response != null) {
				if (response?.panel == 'usoEdicion') {
					this.usoEdicion = true;
					this.usoDetalle = false;
				}

				if (response?.panel == 'usoDetalle') {
					this.usoDetalle = true;
					this.usoEdicion = false;
				}


				if (response?.panel == 'consultaHistoricos') {
					this.consultaHistoricos = true;
				}

				if (response?.panel == 'inventarioDetalle') {
					this.inventarioDetalle = true;
				}

				this.dataUsoDetalle = response.data
				this.dataUsoEdicion = response.data
				this.drawer?.toggle();
			}
		})
	}
}
