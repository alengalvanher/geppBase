import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NeumaticosService {
  serverUrl: string = "/api/Fleet";
    constructor(private _httpClient:HttpClient){
    }
    //Servicios de Neumáticos
    getTireInventory(data:any) {
        const options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};
		const body= data;

		return this._httpClient.post(`${this.serverUrl}/Tire/GetTireInventary`, body, options);
	}

    getTireInventoryDetail(data:any) {
        const options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};
        let body = data;

		return this._httpClient.post(`${this.serverUrl}/Tire/GetVehicleTireInventaryDetail`, body, options);
	}


    getPhysicalDamageCatalog(){
        return this._httpClient.get('https://gpfleet.com/danoneservice/api/Catalogs/GetCatalog/PhysicalDamage')
    }


    setTireMillimeter(data:any){
        const options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};
        let body = data

		return this._httpClient.post(`${this.serverUrl}/Tire/SetTireMillimeter`, body, options)
    }


    getTiresToChange(data:any){
        const options = {
            headers: new HttpHeaders().set("Access-Control-Expose-Headers", "content-disposition")
        };
        let body = data

		return this._httpClient.post(`${this.serverUrl}/Tire/GetTiresToChange`, body, options)
    }


    getTiresToChangeReportFile(data:any) {
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
        };
        let body = data

		return this._httpClient.post<Blob>(`${this.serverUrl}Tire/GetTiresToChangeReportFile`,
                body,
                {
                    observe: 'response',
                    responseType: 'blob' as 'json'
                }
            )
    }

    getFilterCatalog(data:any){
        let url = `${this.serverUrl}Tire/GetFilterCatalog`;
        let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};

        return this._httpClient.post<any>(url, data, options);

    }
}
