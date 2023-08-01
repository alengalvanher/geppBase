import { Injectable, EventEmitter } from '@angular/core';
// import { DrawerComponent } from './drawer/drawer.component';
// import { MatSidenav } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PanelService {
	public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);

	constructor() {
	}

	public toggle(panel: any) {
		console.log("Haciendo Toggle en", panel)
		return this.sideNavToggleSubject.next(panel)
	}
}
