import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
	@ViewChild('mymodal') mymodal: any;
	@Input() 'data':any;
	@Output() 'closed' = new EventEmitter<boolean>;


	constructor(private modalService: NgbModal) {
	}

	ngOnInit(): void {
	}

	accept(modal:any) {
		modal.close();
	}


	ngAfterViewInit() {
		this.modalService.open(this.mymodal, { centered: true }).hidden.subscribe(()=>{
			this.closed.emit(true);
		});
	}
}
