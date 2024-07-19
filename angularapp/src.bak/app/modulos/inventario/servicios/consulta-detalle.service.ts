import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConsultaDetalleService {
    Identifier: EventEmitter<any> = new EventEmitter();
    IdentifierSubStatus: EventEmitter<any> = new EventEmitter();
    Data4tansfer: EventEmitter<any> = new EventEmitter(true);

    constructor() { }
    //Para el panel de detalle
    changeIdentifier([Identifier, status]){
        this.Identifier.emit([Identifier, status]);
    }
    //Para el mini modal del substatus
    changeIdentifier4substatus([Identifier, status]){
        this.IdentifierSubStatus.emit([Identifier, status]);
    }
    
}
