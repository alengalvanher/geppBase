import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-motocarro',
  templateUrl: './plantilla-motocarro.component.html',
  styleUrls: ['./plantilla-motocarro.component.scss']
})
export class PlantillaMotocarroComponent implements OnInit {
  @Input() tires

  constructor() { }

  ngOnInit(): void {
  }

}
