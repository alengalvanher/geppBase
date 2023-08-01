import { Component, OnInit } from '@angular/core';
import { MatTreeNodeToggle } from '@angular/material/tree';


const headerData = {
  Eco: "4724BAN",
  BusinessUnit: "EDP",
  Region: "REGIÓN 4",
  Cedis: "Querétaro",
  TipoUnidad: "Camión"
}
const detailData = {
  Eco: "4724BAN",
  Cbu: "EDP",
  Region: "REGIÓN 4",
  Site: "Querétaro",
  TypeName: "Camión",
  //Primera sección
  Plate: "NFX1259",
  Direction: "Comercial",
  Responsable: "Preventa",
  Factory: "572",
  CeCo: "154051",
  Company: "49",
  Number: "50000713",
  //Sección del camioncito
  SapEco: "No Aplica",
  Serie: "9FB460JS6JM417183",
  EngineSerie: "213776",
  Model: "2014",
  PurchaseDate: "10/10/2014",
  BrandName: "IZUZU",
  ModelName: "ELF600H",
  CylinderCapacity: "V6",
  //Sección de Accesorios
  //Neumaticos
  IdTire: "NFX1259",
  Quantity: "6",
  TireMeasurement: "205/60r16 96h",
  VehicleComplementsList: [
    {
        "Complement": "BodyWorK",
        "Brand": "",
        "Serie": ""
    },
    {
        "Complement": "Cold",
        "Brand": "",
        "Serie": ""
    },
    {
        "Complement": "Ramp",
        "Brand": "",
        "Serie": ""
    }
  ],
  //Carrocería
  CarroceriaSerie: "29592",
  CarroceriaMarca: "Lorem Ipsum",
  //Frío
  FrioSerie:"1185120",
  FrioMarca: "Lorem ipsum",
  //Rampa
  RampaSerie:"1185120",
  RampaMarca: "Lorem ipsum",
  //Leasing Info
  DepreciationAmount: "-2,805.57",
  MissingMonths: "10",
  BookValues: "8,416.72",
  LeasingPurchaseDate: "2018",
  PurchaseOrigin: "LEASING FINANCIERO",
  //Detalles Cajas Combustible
  FuelStatus: "Vigente",
  FuelSupplierName: "EDENRED",
  CombDispositivo: "TAG",
  FuelInsertDate:" 10/10/2014",
  MonthlyPayment: "1,230",
  //Detalles Cajas Seguros
  SegStatus: "Vigente",
  InsuranceName: "EDENRED",
  SegDispositivo: "TAG"
}

@Component({
  selector: 'app-inventario-detalle',
  templateUrl: './inventario-detalle.component.html',
  styleUrls: ['./inventario-detalle.component.scss']
})

export class InventarioDetalleComponent implements OnInit {
  headerData: any = headerData;
  detailData: any = detailData;
  JSONTEST:any;
  constructor() { }

  ngOnInit(): void {
  
  }

}
