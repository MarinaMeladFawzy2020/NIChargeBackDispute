import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var apiURL : any;

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  URL : string = apiURL;

  constructor(private http: HttpClient) { }

  getAllSysAudit(pageNo :any , size: any): Observable<any> {
    console.log(this.URL+`/getAllSysAudit?page=${pageNo}&size=${size}`)
    return this.http.get(this.URL+`/getAllSysAudit?page=${pageNo}&size=${size}`);
  }

  findAudit(pageNo :any , size: any , _f:any): Observable<any> {
    console.log(this.URL+`/findAudit?page=${pageNo}&size=${size}`)
    return this.http.post(this.URL+`/findAudit?page=${pageNo}&size=${size}` , _f );
  }


}