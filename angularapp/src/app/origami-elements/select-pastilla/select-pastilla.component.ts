import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-pastilla',
  templateUrl: './select-pastilla.component.html',
  styleUrls: ['./select-pastilla.component.scss']
})
export class SelectPastillaComponent implements OnInit {
  @Input() optionsData: any
  @Input() typeSelect: any
  @Output() someEvent = new EventEmitter();
  @Output() dateEmitter = new EventEmitter();

  @Output() deleteEmitter = new EventEmitter();

  @Output() multiPass = new EventEmitter<any>();

  multiSelect: FormGroup = new FormGroup({});
  optionsArray: any = [];
  hoveredDate: NgbDate | null = null;

	fromDate: NgbDate | null;
	toDate: NgbDate | null;
  pills: FormGroup<any>;

  displayPlaceholder:any = true;


  nombre:any
  apellido:any

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}

  ngOnInit(): void {
    
    for (var i = 0; i < this.optionsData.length; i++) {
        this.optionsArray.push(this.optionsData[i].Text)
    }
    //console.log(this.optionsArray)
    this.createForm(this.optionsArray);

    this.multiSelect.valueChanges.subscribe(data => {
        //console.log(data)
        this.multiPass.emit(this.convertFormToArray(data));
    })
  }

  //MULTISELECT ['BEC', 'PET', 'EDP']
  createForm(columns) {
    for (var i = 0; i < columns.length; i++) {
        this.multiSelect.addControl(columns[i], new FormControl(true));
    }
  }
  
  convertFormToArray(data) {
    let arrayWithColumns = [];
    
    for (const [key, value] of Object.entries(data)) {
        if (value === true) {
            arrayWithColumns.push(key);
        }
    }
    return arrayWithColumns;
  }
  //DATEPICKER
  convertFechaToDateForm(fecha: NgbDate) {
    let delimitador = '-';
    return (fecha.year + delimitador + fecha.month + delimitador + fecha.day).toString();
  }

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
    
     this.dateEmitter.emit([this.convertFechaToDateForm(this.fromDate),this.convertFechaToDateForm(this.toDate)])
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  emitSelect($event){
    this.displayPlaceholder = false
    this.someEvent.emit($event.target.value)
  }

  //Borrar filtros
  deletePill($event){

    this.deleteEmitter.emit($event)
    
  }
}
