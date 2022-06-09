import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var apiURL : any;
@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  URL : string = apiURL;
  constructor(private http: HttpClient) { }

  getAllBanks(): Observable<any> {
    return this.http.get(this.URL+`/getAllBanks`);
  }

  getTrxType(): Observable<any> {
    return this.http.get(this.URL+`/getTrxType`);
  }

  getDeviceType(): Observable<any> {
    return this.http.get(this.URL+`/getDeviceType`);
  }
  
  getSchemaType(): Observable<any> {
    return this.http.get(this.URL+`/getSchemaType`);
  }

  getVisaIncomingCB(disputeId :any): Observable<any> {
    return this.http.get(this.URL+`/getVisaIncomingCB?disputeId=${disputeId}`);
  }

  getPresentments(disputeId :any): Observable<any> {
    return this.http.get(this.URL+`/getPresentments?disputeId=${disputeId}`);
  }

  getAllCategory(): Observable<any> {
    return this.http.get(this.URL+`/getAllCategory`);
  }
  
  getAllDiscriptions(): Observable<any> {
    return this.http.get(this.URL+`/getAllDiscriptions`);
  }
  



}




