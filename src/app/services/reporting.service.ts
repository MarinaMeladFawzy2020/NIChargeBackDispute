import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  getAllRep(_obj:any): Observable<any> {
    return this.http.post(this.URL+`/findRepresentement` , _obj);
  }

  URL : string = apiURL;
  constructor(private http: HttpClient) { }

  getTicketLogs(_obj:any): Observable<any> {
    return this.http.post(this.URL+`/getTicketLogs` , _obj);
  }
  // getPreArb(_obj:any): Observable<any> {
  //   return this.http.post(this.URL+`/getAllPreArbPaging` , _obj);
  // }

  getPreArb(_obj:any): Observable<any> {
    return this.http.post(this.URL+`/findPreArb` , _obj);
  }

  getCredits(_obj:any): Observable<any> {
    return this.http.post(this.URL+`/findCreditDetails` , _obj);
  }

  getChargeBack(_obj:any): Observable<any> {
    return this.http.post(this.URL+`/findIncomingCB` , _obj);
  }
}
