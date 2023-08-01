import { Component, OnInit } from '@angular/core';
import { ConsultaDetalleService } from '../../../servicios/consulta-detalle.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {
    Identifier:string;

  constructor(private _consultaDetalleService:ConsultaDetalleService) {

    this._consultaDetalleService.Identifier.subscribe(identifier => {
        this.Identifier = identifier;
    })

  }

  ngOnInit(): void {
  }

}
