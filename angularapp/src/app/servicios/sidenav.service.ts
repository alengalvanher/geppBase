import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SidenavService {
	open: boolean = true;
	sideNavState: EventEmitter<any> = new EventEmitter();

	constructor() {
	}

	sideNavToggle() {
		console.log("Ejecutando sideNavToggle");

		this.open = !this.open;

		if (this.open) {
			this.sideNavState.emit('closed');
		} else {
			this.sideNavState.emit('open');
		}
	}
}
