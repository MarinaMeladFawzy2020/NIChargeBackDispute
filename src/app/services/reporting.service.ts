import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  URL : string = apiURL;
  constructor(private http: HttpClient) { }

  getTicketLogs(_obj:any): Observable<any> {
    return this.http.post(this.URL+`/getTicketLogs` , _obj);
  }


}
