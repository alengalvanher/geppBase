import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boton-pastilla',
  templateUrl: './boton-pastilla.component.html',
  styleUrls: ['./boton-pastilla.component.scss']
})
export class BotonPastillaComponent implements OnInit {
  @Output() pillSelect = new EventEmitter();
  @Input() optionsList: any

  constructor() { }

  ngOnInit(): void {
    //console.log(this.optionsList)
  }

}
