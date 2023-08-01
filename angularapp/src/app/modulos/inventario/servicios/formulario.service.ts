import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormularioService {
    FormData: EventEmitter<any> = new EventEmitter();
    constructor() { }


    setFormInformation(data:any, rama:any){
        let formData = {
            rama: rama,
            body: data,
        }

        this.FormData.emit(formData);
    }
}
