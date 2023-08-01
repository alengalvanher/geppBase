import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';

@Component({
  selector: 'app-registro-paso-dos',
  templateUrl: './registro-paso-dos.component.html',
  styleUrls: ['./registro-paso-dos.component.scss']
})
export class RegistroPasoDosComponent implements OnInit {
    paso = "paso1";
    Eco:string;
    cbu:string;
    VehicleTypeText:string;


    responseForPercentage:any = {
        CompanyInformationPercentaje: 0,
        ComplementsInformation: 0,
        FinancialInformation: 0,
        OperativeInformation: 0
    };

    constructor(
        private _inventarioService: InventarioService,
    ) {

        if( localStorage.getItem('VehicleIdentifier')){

            let id = localStorage.getItem('VehicleIdentifier')

            this._inventarioService.getVehicleInformation(id).subscribe(data => {
                //console.log("Data", data)
                this.responseForPercentage.CompanyInformationPercentaje = data.CompanyInformation.InformationProgress
                this.responseForPercentage.OperativeInformation = data.OperativeInformation.InformationProgress
                this.responseForPercentage.FinancialInformation = data.FinancialInformation.InformationProgress
                this.responseForPercentage.ComplementsInformation = data.ComplementsInformation.InformationProgress
            })
        }

    }

    ngOnInit(): void {

        if(localStorage.getItem("Eco"))   this.Eco = localStorage.getItem('Eco')
        if(localStorage.getItem("cbu"))   this.cbu = localStorage.getItem('cbuText')
        if(localStorage.getItem("VehicleTypeText"))   this.VehicleTypeText = localStorage.getItem('VehicleTypeText')

    }


    continuar(modal: any) {
        modal.close();
        this.paso = "paso2";
    }
}
