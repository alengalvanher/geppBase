import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-table-filter-pills',
    templateUrl: './table-filter-pills.component.html',
    styleUrls: ['./table-filter-pills.component.scss']
})
export class TableFilterPillsComponent implements OnInit {
    @Input() dataBody: any;
    // @Output() filtersNeeded: any;

    filtersNeeded:any;
    pillsDisplay: FormGroup = new FormGroup({});

    constructor() {
    }


    ngOnInit(): void {
    }


    ngOnChanges(){
        let indices = this.getIndices(this.dataBody)
        let filtrosAprovados = [];

        indices.forEach(element => {
            let duplicados = this.counterDuplicates(this.dataBody, element);
            let contadorDeDuplicados = this.contadorDeDuplicados(duplicados);

            if( contadorDeDuplicados < 100 ){
                filtrosAprovados[element] = contadorDeDuplicados
            }
        });

		console.log("filtrosAprovados", filtrosAprovados);
        this.filtersNeeded = filtrosAprovados;

        this.createForm(filtrosAprovados)
    }

    ngAfterViewInit(){
    }



    createForm(columns) {
        let cantidadDeItems = this.contadorDeDuplicados(columns)

        console.log("KEYS", Object.keys(columns))

        for (var i = 0; i < cantidadDeItems; i++) {
            this.pillsDisplay.addControl(columns[i], new FormControl(true));
        }

        console.log("QUEDA", this.pillsDisplay)
    }



    // Retorna los indices disponibles.
	getIndices(data?){
		let indices = []
		let item = data[0];

		for (const [key, value] of Object.entries(item)) {
			indices.push(key)
		}

		return indices
	}


	contadorDeDuplicados(counter){
		var count = 0;

		for(var prop in counter) {
			if(counter.hasOwnProperty(prop))
				++count;
		}

		return count;
	}


	counterDuplicates(arr, field){
		var counter = {};

		for (var i = 0; i < arr.length; i += 1) {
			counter[arr[i][field]] = (counter[arr[i][field]] || 0) + 1;
		}

		return counter;
	}
}
