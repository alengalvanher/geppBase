import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CbuService {
    CbuValue:string;
    Cbu: EventEmitter<string> = new EventEmitter();

    constructor() {
    }

    setCbu(cbu:string){
        this.CbuValue = cbu;
        this.Cbu.emit(cbu);
    }
}
