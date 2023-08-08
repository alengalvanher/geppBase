import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-filter-by-date',
    templateUrl: './filter-by-date.component.html',
    styleUrls: ['./filter-by-date.component.scss']
})
export class FilterByDateComponent implements OnInit {
    @Input() position: string;
    @Input() default: any;
    @Input() yearsAmount = 5;
    @Output() dataDatePicker = new EventEmitter<any>();
    displayDatePicker: boolean = false;
    vista: string = 'periodo';
    dateDisplay: FormControl = new FormControl();
    monthsSelectValues = [];
    aniosSelectValues = [];
    months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    objectResponse:any
    INITIALDATEModel:any
    FINALDATEModel:any

    datePickerForm: FormGroup = new FormGroup({
        Week: new FormControl({ value: '', disabled: true }),
        Month: new FormControl({ value: '', disabled: true }),
        Year: new FormControl(''),
        StartDate: new FormControl(''),
        EndDate: new FormControl({ value: '', disabled: true }),
        StartTime: new FormControl(''),
        EndTime: new FormControl(''),
    });


    weeksSelectValues = [
        { value: '1', viewValue: '1' },
        { value: '2', viewValue: '2' },
        { value: '3', viewValue: '3' },
        { value: '4', viewValue: '4' },
        { value: '5', viewValue: '5' }
    ];

    time = { hour: 12, minute: 0 };
    time2 = { hour: 12, minute: 0 };

    constructor() {
        this.datePickerForm.get('Year').valueChanges.subscribe((data) => {
            this.datePickerForm.get('Week').enable();
            this.datePickerForm.get('Month').enable();

            this.updateMonths(data);
            this.updateWeeks(data);
        });

        this.datePickerForm.get('StartDate').valueChanges.subscribe(() => {
            this.datePickerForm.get('EndDate').enable();
        });
        

    }

    ngOnInit(): void {
        this.aniosSelectValues = this.generateYears();
        //console.log(this.position, 'position')
        //Calcular la fecha de hoy y hoy -3 y setearlas a las fechas
        //console.log(this.default)
       //console.log(parseInt(this.default.INITIALDATE.split("-")[0]))
       let parseDateInitial = [parseInt(this.default.INITIALDATE.split("-")[0]),parseInt(this.default.INITIALDATE.split("-")[1]),parseInt(this.default.INITIALDATE.split("-")[2])]
       let parseDateFinal = [parseInt(this.default.FINALDATE.split("-")[0]),parseInt(this.default.FINALDATE.split("-")[1]),parseInt(this.default.FINALDATE.split("-")[2])]
       this.INITIALDATEModel = new NgbDate (parseDateInitial[0],parseDateInitial[1],parseDateInitial[2])
       this.FINALDATEModel = new NgbDate (parseDateFinal[0],parseDateFinal[1],parseDateFinal[2])
    }


    showDatePicker() {
        this.displayDatePicker = true;
    }

    hideDatePicker() {
        this.clearForm();
        this.displayDatePicker = false;
    }

    changeView(item) {
        this.vista = item;
        this.clearForm();
    }

    sendDatePickerData() {
        // Mostrar la fecha seleccionada en el Input
        let dateFormatForDisplay = this.createDateDisplay(this.datePickerForm.value)
        
        this.dateDisplay.setValue(dateFormatForDisplay);

       
        //
        this.objectResponse = this.formatDateResponse(this.datePickerForm.value);

        this.objectResponse.StartDate = this.formatDate(this.objectResponse.StartDate)
        this.objectResponse.EndDate = this.formatDate(this.objectResponse.EndDate)
        this.objectResponse.StartTime = this.datePickerForm.value.StartTime
        this.objectResponse.EndTime = this.datePickerForm.value.EndTime

        this.dataDatePicker.emit( this.objectResponse );

        // Ocultar el DatePicker
        this.hideDatePicker();
    }

    formatDateResponse(formData: any) {
        let objectParsed = {};

        if(formData.Week) {
            objectParsed['Week'] = formData.Week;
        }

        if(formData.Month) {
            objectParsed['Month'] = formData.Month;
        }

        if(formData.Year) {
            objectParsed['Year'] = formData.Year;
        }

        if(formData.StartDate) {
            objectParsed['StartDate'] = `${formData.StartDate.year}-${formData.StartDate.month}-${formData.StartDate.day} ${formData.StartTime.hour}:${formData.StartTime.minute}`;
        }

        if(formData.EndDate) {
            objectParsed['EndDate'] = `${formData.EndDate.year}-${formData.EndDate.month}-${formData.EndDate.day} ${formData.EndTime.hour}:${formData.EndTime.minute}`;
        }

        return objectParsed;
    }


    clearForm() {
        this.datePickerForm.patchValue({
            Year: '',
            Week: '',
            Month: '',
            StartDate: '',
            EndDate: ''
        });

        this.datePickerForm.get('Week').disable();
        this.datePickerForm.get('Month').disable();
        this.datePickerForm.get('EndDate').disable();
    }


    createDateDisplay(d) {
       
        var display = '';
        let disp = ''

        if (d.Week) {
            display = `${display} Semana ${d.Week}`;
        }

        if (d.Month) {
            display = `${display} ${this.months[d.Month - 1]}`;
        }

        if (d.Year) {
            display = `${display}, ${d.Year}`;
        }

        if (d.StartDate) {
            display = `${display} ${this.formatDate(d.StartDate)}`;
            disp = d.StartDate.year+'-'+d.StartDate.month+'-'+d.StartDate.day
        }

        if (d.EndDate) {
            display = `${display} - ${this.formatDate(d.EndDate)}`;
            disp +=  ' a '+ d.EndDate.year+'-'+d.EndDate.month+'-'+d.EndDate.day
        }

        return disp;
    }


    returnMonths(year) {
        let currentYear = new Date().getFullYear();

        if (year == currentYear) {
            return new Date().getMonth() + 1;
        } else {
            return 12
        }
    }



    formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
	
		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
	
		return [year, month, day].join('-');
	}


    // Actualiza los meses en el select
    updateMonths(year) {
        this.monthsSelectValues = this.generateMonths(year);
    }

    updateWeeks(year){
        this.weeksSelectValues = this.generateWeeks(year);
    }


    // Retorna un arreglo con los meses del año dado.
    generateWeeks(year) {
        let currentYear = new Date().getFullYear();
        let selectedValues = [];
        var numberOfWeeks

        if (year == currentYear) {
            numberOfWeeks = this.getWeekNumberOfYear();
        } else {
            numberOfWeeks = this.weeksInYear(year);
        }


        for(let i = 0; i < numberOfWeeks; i++) {
            selectedValues.push( { value: i+1, viewValue: i+1 } );
        }

        return selectedValues;
    }


    // Retorna un arreglo con los meses del año dado.
    generateMonths(year) {

        let numberOfMonths = this.returnMonths(year);
        let selectedValues = [];

        for(let i = 0; i < numberOfMonths; i++) {
            selectedValues.push( { value: i+1, viewValue: this.months[i] } );
        }

        return selectedValues;
    }


    generateYears() {
        let currentYear = new Date().getFullYear();
        let selectValues = [];

        for (let i = currentYear; i > (currentYear - this.yearsAmount); i--) {
            selectValues.push({ value: i, viewValue: i });
        }

        return selectValues;
    }


    getWeekNumberOfYear(){
        let currentDate:any = new Date();
        let startDate:any = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor(( currentDate - startDate ) /
            (24 * 60 * 60 * 1000));

        return Math.ceil(days / 7);
    }


    getWeekNumber(d) {
        d = new Date(+d);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        let yearStart:any = new Date( d.getFullYear(), 0, 1 );
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
        return [d.getFullYear(), weekNo];
    }


    weeksInYear(year) {
        var month = 11, day = 31, week;

        do {
            let d = new Date(year, month, day--);
            week = this.getWeekNumber(d)[1];
        } while (week == 1);

        return week;
    }
}
