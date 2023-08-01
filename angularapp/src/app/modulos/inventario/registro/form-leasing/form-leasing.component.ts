import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';


@Component({
    selector: 'app-form-leasing',
    templateUrl: './form-leasing.component.html',
    styleUrls: ['./form-leasing.component.scss']
})
export class FormLeasingComponent implements OnInit {
    @ViewChild('simpleAlert') simpleAlert:any
    responseData:any

    LessorList:any;
    LeasingTypeList:any;
    PurchaseOriginList:any;
    OwnerList:any;


    formLeasingInformation = new FormGroup({
        LeasingPurchaseDate: new FormControl('', Validators.required),
        PurchaseOrigin: new FormControl('', Validators.required),
        Lessor: new FormControl(''),

        Owner: new FormControl('', Validators.required),
        LeasingType: new FormControl(''),
        Annex: new FormControl(''),

        Contract: new FormControl(''),
        StartDate: new FormControl(''),
        EndDate: new FormControl(''),

        InitialValue: new FormControl(''),
        DepreciationValue: new FormControl(''),
        Budgets: new FormControl(null),

        Capital: new FormControl(''),
        InterestRate: new FormControl(''),
        OperatingIncome: new FormControl(''), // **

        ResidualPercentage: new FormControl('', Validators.required),
        ResidualAmount: new FormControl(''),
        Interest: new FormControl(''),

        DaysToExpire: new FormControl('', Validators.required),
        MissingRent: new FormControl('', Validators.required),
    })
    constructor(
        private _inventarioService: InventarioService,
        private _ngbModal: NgbModal
        ) {
        this._inventarioService.getCatalog('Leasing').subscribe(data => {
            console.log("LEASING", data);
            this.LessorList = data['LessorList'];
            this.LeasingTypeList = data['LeasingTypeList'];
            this.PurchaseOriginList = data['PurchaseOriginList'];
            this.OwnerList = data['OwnerList'];
        })

    }


    ngOnInit(): void {

        if( localStorage.getItem('VehicleIdentifier') ){
            this.getFormData(localStorage.getItem('VehicleIdentifier'))
        }
    }


    sendForm() {
        let data = this.formLeasingInformation.value

        console.log("La data inicial es: ", data)

        let objeto:any = data;
        objeto['LeasingPurchaseDate'] = this.convertDate(data.LeasingPurchaseDate);
        objeto['StartDate'] = this.convertDate(data.StartDate);
        objeto['EndDate'] = this.convertDate(data.EndDate);


        let formInventary:any = {
            VehicleIdentifier: localStorage.getItem('VehicleIdentifier'),
            OperativeInformation: {
                LeasingInformation: objeto
            }
        }


        this._inventarioService.sendInventoryForm(formInventary).subscribe(response => {
            this.responseData = response;
            this._ngbModal.open(this.simpleAlert, { centered: true, backdrop : 'static', keyboard : false });
        });
    }


    resetForm() {
        this.formLeasingInformation.patchValue({
            LeasingPurchaseDate: '',
            PurchaseOrigin: '',
            Lessor: '',
            Owner: '',
            LeasingType: '',
            Annex: '',
            Contract: '',
            StartDate: '',
            EndDate: '',
            InitialValue: '',
            DepreciationValue: '',
            Budgets: '',
            Capital: '',
            InterestRate: '',
            OperatingIncome: '',
            ResidualPercentage: '',
            ResidualAmount: '',
            Interest: '',
            DaysToExpire: '',
            MissingRent: ''
        });
    }


    // Trae datos capturados previamente desde un servicio.
    getFormData(Identifier) {
        this._inventarioService.getVehicleInformation(Identifier).subscribe(response => {

            let objetoResponse = Object.assign({}, response.OperativeInformation.LeasingInformation);
            objetoResponse.LeasingPurchaseDate = this.convertFechaToDateForm( response.OperativeInformation.LeasingInformation.LeasingPurchaseDate );
            objetoResponse.StartDate = this.convertFechaToDateForm( response.OperativeInformation.LeasingInformation.StartDate );
            objetoResponse.EndDate = this.convertFechaToDateForm( response.OperativeInformation.LeasingInformation.EndDate );

            this.formLeasingInformation.patchValue( objetoResponse );
		});
    }


    convertFechaToDateForm(fecha):NgbDateStruct | null {
        let delimitador = '-';
        const date = fecha.split(delimitador);

        return {
            year: parseInt(date[0], 10),
            month: parseInt(date[1], 10),
            day: parseInt(date[2], 10),
        };
    }


    convertDate(date) {
        try {

            if( date['year'] != undefined ) {
                let year = date['year']
                let month = ('00'+date['month']).slice(-2)
                let day = ('00'+date['day']).slice(-2)
                return `${year}-${month}-${day}`
            }


        } catch (error) {
            return date
        }
    }

    modalDismiss(){
		this._ngbModal.dismissAll();
	}
}
