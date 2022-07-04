import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-incoming-cb',
  templateUrl: './incoming-cb.component.html',
  styleUrls: ['./incoming-cb.component.css']
})
export class IncomingCBComponent implements OnInit {
  [x:string]:any;
  first:any = 0;
  last:any = 0;
  totalRecords:any = 0;
  totalRow:any = 50;
    constructor(private dataApi: ReportingService) { }
  
    ngOnInit(): void {
      this.AllChargeBack = [];
      
      this.cols = [
        { field: 'pan', header: 'PAN', display:1},
        { field: 'arn', header: 'ARN', display:1},
        { field: 'auth_ID', header: 'AUTH ID' , display:1},
        { field: 'bank', header: 'Bank' , display:1},
        { field: 'trx_DATE', header: 'TRX DATE' , display:1},
        { field: 'amount', header: 'Amount', display:1},

        { field: 'rol_CASE_NUMBER', header: 'Role Case Number' , display:1},
        { field: 'dispute_ID', header: 'Dispute ID' , display:1},
        { field: 'curr', header: 'Curr', display:1}

    ];
   
    this.selectedcols = this.cols.filter((col: any) =>  col.display == 1);
    this._selectedColumns =  this.selectedcols ;
  
    }
  
    @Input() get selectedColumns(): any[] {
      return this._selectedColumns;
    }
    set selectedColumns(val: any[]) {
      //restore original order
      this.selectedcols = val;
      this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
      this._selectedColumns =  this.selectedcols
      console.log(this.selectedcols)
    }
  
    getChargeBack(_dataobj:any){
      this.loading = true;
      this.dataApi.getChargeBack(_dataobj).subscribe(
        Response=> {
          console.log(Response)
          this.loading = false;
          this.len = Response.totalItems;
          if(this.len > 0){
            this.AllChargeBack = Response.chargeBackList;
          }else if(this.len == 0){
            this.AllChargeBack = {};
          }
        },
        (error) => {                              
          console.log(error);
        // bootbox.alert({title: "<span style='color:#a33;font-weight: 500; font-size: 16px'>" + "Warning message" + "</span>", message: "<span style='color:Black;font-weight: 500; font-size: 16px'>" + "No data found" + "</span>"});
        }
       );
  
  }
  
  // data Search 
  getDoneSearch($event: any) {
    this.loading = true;
    console.log($event);
    this.objectbySearch = $event;
    this.loading = false;
    if(this.objectbySearch == 'reset'){
      this.AllChargeBack = [];
    }else{
      this.getChargeBack(this.objectbySearch);
    }
  
  }
  
  
  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
    // console.log( document.getElementById('dt3'));
    this.dataID = document.getElementById('dt3');
    const worksheet = xlsx.utils.table_to_sheet(this.dataID);
    //  const worksheet = xlsx.utils.json_to_sheet(this.AllSysAudit);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "AllChargeBack");
    });
  }
  
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
 FileSaver.saveAs(data, fileName + '_' + formatDate(new Date(), "dd-MMM-YYYY hh:mm", 'en-US') + EXCEL_EXTENSION);
  }
  
  }
  