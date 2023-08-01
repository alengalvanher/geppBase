import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';





@Injectable({
    providedIn: 'root'
})
export class CargadearchivosService {
  serverUrl: string = "/api/Fleet/";

    constructor(private httpClient: HttpClient) {
    }


    public getFacturaData(formData: any) {
        return this.httpClient.post<any>(`${this.serverUrl}GetDocumentInformation`, formData, {});
    }


    public sendFormData(formData: any) {
        let headers = new HttpHeaders();
        return this.httpClient.post<any>(this.serverUrl + "file/Fleet/FillInventory", formData, { headers: headers });
    }


    public getInventory() {
        return this.httpClient.post(this.serverUrl + "GetVehicleInventary", {}, {});
    }

    public getInventoryDetail(id: any) {
        console.log("Enviando identifier", id);


        const options = {
            Identifier: 'text' as const,
        };


        const body: any = {
            "Identifier": id
        }

        // const algo = new StringContent(body, Encoding.UTF8, "application/json");


        return this.httpClient.post<any>(this.serverUrl + "GetVehicleDetail", body, { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') });

    }
}

