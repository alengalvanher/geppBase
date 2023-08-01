import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-iconblue',
  templateUrl: './iconblue.component.html',
  styleUrls: ['./iconblue.component.scss']
})
export class IconblueComponent implements OnInit {
  @Input() origamiicon = '';

  constructor(
  ) {
    // this.origamiicon = "fa fa-times";
  }

  ngOnInit(): void {
  }

}
