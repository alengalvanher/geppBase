import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from "./../../servicios/auth.service";
import { SidenavService } from "./../../servicios/sidenav.service";
import { menuData, MenuNode } from "./../menu-data";

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
    menuUpper = true;
	public isCollapsed = true;
	userName = "";
	checked = false;
	horizontalMenuToggler: boolean = false;



    public menuItems!: any[];
	public items: any[] = menuData;
	public text!: string;
	public SearchResultEmpty: boolean = false;


    topBarForm = new FormGroup({
		BusinessUnit: new FormControl('')
	})


    businessUnitSelectValues = [
        { value: '5A2D6B29-0452-4A7D-B6A6-E2BF1EBEFB81', viewValue: 'BEC' },
        { value: '8FD40165-1E1A-4BD1-B0E3-A7D920E63EEA', viewValue: 'EDP' },
        { value: 'BBC4B119-C271-4339-B9E3-47C7F0A8C6CC', viewValue: 'PET' }
    ];

    constructor(private _authService: AuthService, private _sidenavService: SidenavService) { }



    ngOnInit(): void {
        this.topBarForm.controls.BusinessUnit.valueChanges.subscribe( data => {
            localStorage.setItem('cbu', data)

            this.businessUnitSelectValues.map( data => {
                if( data.value == localStorage.getItem('cbu') )  localStorage.setItem('cbuText', data.viewValue)
            })
        })

        //this.topBarForm.get('BusinessUnit').setValue(this.businessUnitSelectValues[0]['value'])

        if( !localStorage.getItem('cbu') ) localStorage.setItem('cbu', this.businessUnitSelectValues[0].value)
    }



    openSideNav() {
        console.log("Click en openSideNav");
        this._sidenavService.sideNavToggle();
    }


    closeSesion() {
        this._authService.SignOut();
    }
}
