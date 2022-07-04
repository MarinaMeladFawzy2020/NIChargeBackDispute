import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var apiURL : any;

@Injectable({
  providedIn: 'root'
})
export class DisputeService {

  URL : string = apiURL;

  constructor(private http: HttpClient) { }

  getAllDispute(): Observable<any> {
    return this.http.get(this.URL+`/getAllDispute`);
  }

  getAllDisputePaging(pageNo :any , size: any): Observable<any> {
    return this.http.get(this.URL+`/getAllDisputePaging?page=${pageNo}&size=${size}`);
  }

  CreateDispute(_f:any): Observable<any> {
    return this.http.post(this.URL+`/CreateDispute` , _f);
  }

  
  UpdateDispute( _f:any): Observable<any> {
    console.log(this.URL+`/UpdateDispute`);
    return this.http.post(this.URL+`/UpdateDispute` , _f);
  }


  ManualUpdateDispute(disputeId:any , _f:any): Observable<any> {
    console.log(this.URL+`/ManualUpdateDispute?disputeId=${disputeId}`);
    return this.http.post(this.URL+`/ManualUpdateDispute?disputeId=${disputeId}` , _f);
  }


  findDispute(pageNo :any , size:any , _f:any): Observable<any> {
  console.log(_f);
    return this.http.post(this.URL+`/findDispute?page=${pageNo}&size=${size}` , _f);
  }
  
  getDisputeDetails(disputeId :any): Observable<any> {
    return this.http.get(this.URL+`/getDispute?disputeId=${disputeId}`);
  }

  updateDisputeStatus(disputeId :any,disputeStatus:any): Observable<any> {
    console .log(this.URL+`/updateStatus?disputeId=${disputeId}&disputeStatus=${disputeStatus}`);
    return this.http.get(this.URL+`/updateStatus?disputeId=${disputeId}&disputeStatus=${disputeStatus}`);
  }
  getAllAttributeLabels(): Observable<any> {
    return this.http.get(this.URL+`/AllAttributeLabels`);
  }

  LinkCMS(_f:any): Observable<any> {
  console.log(_f);
    return this.http.post(this.URL+`/LinkCMS` , _f);
  }

  LinkManualCMS(disputeId :any , transactionId :any): Observable<any> {
    console.log(this.URL+`/LinkManualCMS?disputeId=${disputeId}&transactionId=${transactionId}`);
    return this.http.get(this.URL+`/LinkManualCMS?disputeId=${disputeId}&transactionId=${transactionId}`);
  }


  linkedDisputeById(disputeId :any): Observable<any> {
    return this.http.get(this.URL+`/linkedDisputeById?disputeId=${disputeId}`);
  }

  getDisputeHistory(disputeId :any): Observable<any> {
    return this.http.get(this.URL+`/getDisputeHistory?disputeId=${disputeId}`);
  }

  getAttachment(attachmentId :any): Observable<any> {
    return this.http.get(this.URL+`/getAttachment?attachmentId=${attachmentId}`);
  }

  getIssue(issueKey :any): Observable<any> {
    return this.http.get(this.URL+`/GetIssue?issueKey=${issueKey}`);
  }

  closeDispute(disputeId :any): Observable<any> {
    return this.http.get(this.URL+`/closeDispute?disputeId=${disputeId}`);
  }


 

}



