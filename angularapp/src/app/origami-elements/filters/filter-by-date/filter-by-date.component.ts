import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-filter-by-date',
    templateUrl: './filter-by-date.component.html',
    styleUrls: ['./filter-by-date.component.scss']
})
export class FilterByDateComponent implements OnInit {
    @Input() position: string;

    @Input() yearsAmount = 5;
    @Output() dataDatePicker = new EventEmitter<any>();
    displayDatePicker: boolean = false;
    vista: string = 'periodo';
    dateDisplay: FormControl = new FormControl();
    monthsSelectValues = [];
    aniosSelectValues = [];
    months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    

    datePickerForm: FormGroup = new FormGroup({
        Week: new FormControl({ value: '', disabled: true }),
        Month: new FormControl({ value: '', disabled: true }),
        Year: new FormControl(''),
        StartDate: new FormControl(''),
        EndDate: new FormControl({ value: '', disabled: true })
    });


    weeksSelectValues = [
        { value: '1', viewValue: '1' },
        { value: '2', viewValue: '2' },
        { value: '3', viewValue: '3' },
        { value: '4', viewValue: '4' },
        { value: '5', viewValue: '5' }
    ];







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
        console.log(this.position, 'position')
       //Calcular la fecha de hoy y hoy -3 y setearlas a las fechas
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
        let objectResponse = this.formatDateResponse(this.datePickerForm.value);


        this.dataDatePicker.emit( objectResponse );

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
            objectParsed['StartDate'] = `${formData.StartDate.year}-${formData.StartDate.month}-${formData.StartDate.day}`;
        }

        if(formData.EndDate) {
            objectParsed['EndDate'] = `${formData.EndDate.year}-${formData.EndDate.month}-${formData.EndDate.day}`;
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
        }

        if (d.EndDate) {
            display = `${display} - ${this.formatDate(d.EndDate)}`;
        }

        return display;
    }


    returnMonths(year) {
        let currentYear = new Date().getFullYear();

        if (year == currentYear) {
            return new Date().getMonth() + 1;
        } else {
            return 12
        }
    }



    formatDate(d) {
        return `${d.year}-${d.day}-${d.month}`;
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
