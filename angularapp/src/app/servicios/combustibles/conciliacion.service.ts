import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConciliacionService {
  serverUrl: string = "/api/Fleet";


    constructor(private _httpClient:HttpClient){
    }


    public sendFormData(formData:any) {
        let url = `${this.serverUrl}Fuel/FillFuelConsumption`;
        console.log("LA URL CONSULTADA ES: ", url);
		return this._httpClient.post<any>( url, formData, {});
	}



    fillFuelConsumption(data:any){
        let url = `${this.serverUrl}Fleet/FillFuelConsumption`;
        let body = data;
        // let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};

        console.log("DATA", data);

        // return this._httpClient.post<any>(url, body, options);
        // return this._httpClient.post<any>(url, body);
    }


    GetFuelSupplierConciliationWithSummary(data:any){
        let url = `${this.serverUrl}Conciliation/GetFuelSupplierConciliationWithSummary`;

        let body = data;
        let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};

        console.log("Llamando al servicio: ", url);

        return this._httpClient.post<any>(url, body, options);
    }


    GetSupplierTabs(){
        let url = `${this.serverUrl}Conciliation/GetSupplierTabs`;
        let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};

        return this._httpClient.post<any>(url, options);
    }



    getFuelConciliation(request){
        let url = `${this.serverUrl}Conciliation/GetFuelConciliation`;
        let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};
        let data = request

        return this._httpClient.post<any>(url, request, options)
    }



    getCatalogCbu(){
        let url = `${this.serverUrl}Catalogs/GetCatalog/Cbu`;
        return this._httpClient.get<any>(url)
    }


    getCatalogSupplier(){
        let url = `${this.serverUrl}Catalogs/GetCatalog/FuelSupplier`;
        return this._httpClient.get<any>(url)
    }


    getOutOfCedisDetail(request){
        let url = `${this.serverUrl}Conciliation/GetOutOfCedisDetail`;
        let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};

        let data = request

        return this._httpClient.post<any>(url, request, options)
    }


    // Trae los filtros de las pastillas
    getFilterCatalog(data:any){
        let url = `${this.serverUrl}Conciliation/GetFilterCatalog`;
        let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};

        return this._httpClient.post<any>(url, data, options);

    }




    getConciliationFile(data:any) {
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
        };
        let body = data

		return this._httpClient.post<Blob>(`${this.serverUrl}Conciliation/GetFuelConciliationFile`,
                body,
                {
                    observe: 'response',
                    responseType: 'blob' as 'json'
                }
            )
    }
}
