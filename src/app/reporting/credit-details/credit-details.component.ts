import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-credit-details',
  templateUrl: './credit-details.component.html',
  styleUrls: ['./credit-details.component.css']
})
export class CreditDetailsComponent implements OnInit {
  [x:string]:any;
  first:any = 0;
  last:any = 0;
  totalRecords:any = 0;
  totalRow:any = 50;
    constructor(private dataApi: ReportingService) { }
  
    ngOnInit(): void {
      this.AllCredits = [];
      this.cols = [
        { field: 'userId', header: 'User ID', display:1},
        { field: 'docNum', header: 'Doc Num', display:1},
        { field: 'entryDate', header: 'Entry Date' , display:1},
        { field: 'trxnDate', header: 'Trxn Date' , display:1},
        { field: 'amount', header: 'Amount' , display:1},
        { field: 'dbAcc', header: 'DB ACC' , display:1},
        { field: 'dbClient', header: 'DB Client' , display:1},
        { field: 'dbCard', header: 'DB Card', display:1},
        { field: 'accCur', header: 'ACC Cur', display:1},
        { field: 'crAcc', header: 'CR ACC', display:1},
        { field: 'crClient', header: 'CR Client' ,display:1},

        { field: 'crCard', header: 'CR Card' ,display:1},
        { field: 'crCur', header: 'CR Cur' ,display:1},
        { field: 'entryCode', header: 'EntryCode',display:1 },
        { field: 'operation', header: 'Operation',display:1 },
        { field: 'comments', header: 'Comments',display:1 }

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
  
    getCredits(_dataobj:any){
      this.loading = true;
      this.dataApi.getCredits(_dataobj).subscribe(
        Response=> {
          console.log(Response)
          this.loading = false;
          this.len = Response.totalItems;
          if(this.len > 0){
            this.AllCredits = Response.creditList;
          }else if(this.len == 0){
            this.AllCredits = {};
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
      this.AllCredits = [];
    }else{
      this.getCredits(this.objectbySearch);
    }
  
  }
  
  
  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
   // console.log( document.getElementById('dt2'));
    this.dataID = document.getElementById('dt2');
    const worksheet = xlsx.utils.table_to_sheet(this.dataID);
    //  const worksheet = xlsx.utils.json_to_sheet(this.AllSysAudit);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "AllCredits");
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
  