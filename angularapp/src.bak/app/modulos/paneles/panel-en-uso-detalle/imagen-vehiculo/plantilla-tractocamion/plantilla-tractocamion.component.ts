import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-tractocamion',
  templateUrl: './plantilla-tractocamion.component.html',
  styleUrls: ['./plantilla-tractocamion.component.scss']
})
export class PlantillaTractocamionComponent implements OnInit {
  @Input() tires

  constructor() { }

  ngOnInit(): void {
  }

}
