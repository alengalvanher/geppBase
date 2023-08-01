import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  serverUrl: string = "/api/Fleet/";


  constructor(private _httpClient: HttpClient) {
  }


  getInventory(data: any) {
    let url = `${this.serverUrl}Fleet/GetVehicleInventary`;
    let body = data;
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

    return this._httpClient.post<any>(url, body, options);
  }

  getInventoryDetail(id: string) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };
    const body: any = { "Identifier": id }

    return this._httpClient.post<any>(`${this.serverUrl}Fleet/GetVehicleDetail`, body, options);
  }

  getVehicleHistory(eco: string) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };
    const body: any = { "Eco": eco }

    return this._httpClient.post<any>(`${this.serverUrl}Fleet/GetVehicleHistory`, body, options);
  }

  getStatusInformationProgress(id: string) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };
    const body: any = { "Identifier": id }

    return this._httpClient.post<any>(`${this.serverUrl}Fleet/GetInformationProgress`, body, options);
  }

  setVehicleTransfer(data: any) {
    let url = `${this.serverUrl}Fleet/SetVehicleTransfer`;
    let body = data;
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

    return this._httpClient.post<any>(url, body, options);
  }
  setVehicleAvailability(data: any) {
    console.log("ENVIANDO SERVICIO", data)

    let url = `${this.serverUrl}Fleet/SetVehicleAvailability`;
    let body = data;
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

    return this._httpClient.post<any>(url, body, options);
  }
  getSubStatus(id: string) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };
    const body: any = { "Identifier": id }

    return this._httpClient.post<any>(`${this.serverUrl}Catalogs/GetSubStatus`, body, options);
  }

  getVehicleSubStatus(id: string) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };
    const body: any = { "Identifier": id }

    return this._httpClient.post<any>(`${this.serverUrl}Fleet/GetVehicleSubStatus`, body, options);
  }

  getCatalog(catalog: string) {
    return this._httpClient.get(`${this.serverUrl}/Catalogs/GetCatalog/${catalog}`, {});
  }

  getCarWheelsByVehicleType(body) {
    return this._httpClient.post(`${this.serverUrl}/Catalogs/GetCarWheelsByVehicleType`, body, {});
  }

  getStatus(status: string) {
    return this._httpClient.get(`${this.serverUrl}/Catalogs/${status}`, {});
  }

  sendInventoryForm(data: any) {
    let url = `${this.serverUrl}/Fleet/SetVehicleInformation`;
    let body = data;
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

    return this._httpClient.post<any>(url, body, options);
  }

  getSitesByRegion(brand: string) {
    let url = `${this.serverUrl}/Catalogs/GetSitesByRegion`;
    let body = {
      "Identifier": brand
    };
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

    return this._httpClient.post<any>(url, body, options);
  }

  getModelsByBrand(brand: string) {
    let url = `${this.serverUrl}/Catalogs/GetModelsByBrand`;
    let body = {
      "BrandIdentifier": brand
    };
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

    return this._httpClient.post<any>(url, body, options);
  }


  SetAgencyInformation(data: any) {
    let url = `${this.serverUrl}/Fleet/SetAgencyInformation`;
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

    return this._httpClient.post<any>(url, data, options);
  }


  getVehicleInformation(Identifier) {
    let data = {
      Identifier: Identifier
    }
    let url = `${this.serverUrl}/Fleet/GetVehicleInformation`;
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

    this._httpClient.post<any>(url, data, options).subscribe(response => {
      this.saveInventarioSession(response);
    });

    return this._httpClient.post<any>(url, data, options);
  }


  saveInventarioSession(response) {

    let user = {
      VehicleIdentifier: response.CompanyInformation.VehicleIdentifier,
      Eco: response.CompanyInformation.Eco
    }

    window.sessionStorage.setItem('user', JSON.stringify(user));

  }

  getFilterCatalog(data: any) {
    let url = `${this.serverUrl}Fleet/GetFilterCatalog`;
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

    return this._httpClient.post<any>(url, data, options);

  }

}
