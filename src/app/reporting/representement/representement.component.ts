import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-representement',
  templateUrl: './representement.component.html',
  styleUrls: ['./representement.component.css']
})
export class RepresentementComponent implements OnInit {
  [x:string]:any;
  first:any = 0;
  last:any = 0;
  totalRecords:any = 0;
  
  totalRow:any = 50;
    constructor(private dataApi: ReportingService) { }
  
    ngOnInit(): void {
      this.AllRep = [];
      this.cols = [
        { field: 'pan', header: 'PAN', display:1},
        { field: 'arn', header: 'ARN', display:1},
        { field: 'auth_ID', header: 'AUTH ID' , display:1},
        { field: 'bank', header: 'Bank' , display:1},
        { field: 'representation_DATE', header: 'Representation Date' , display:1},
        { field: 'amount', header: 'Amount', display:1},
        { field: 'vrolcaseno', header: 'Role Case Number' , display:1},
        { field: 'dispute_ID', header: 'Dispute ID' , display:1},
        { field: 'curr_CODE', header: 'Curr Code', display:1},
        { field: 'dispute_CONDITION', header: 'Condition' , display:1},
        { field: 'dispute_REASON', header: 'Reason', display:1}
      
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
  
    getAllRep(_dataobj:any){
      this.loading = true;
      this.dataApi.getAllRep(_dataobj).subscribe(
        Response=> {
          console.log(Response)
          this.loading = false;
          this.len = Response.totalItems;
          if(this.len > 0){
            this.AllRep = Response.RepList;
          }else if(this.len == 0){
            this.AllRep = {};
          }
        },
        (error: any) => {                              
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
      this.AllRep = [];
    }else{
      this.getAllRep(this.objectbySearch);
    }
  
  }
  
  
  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
    // console.log( document.getElementById('dt4'));
    this.dataID = document.getElementById('dt4');
    const worksheet = xlsx.utils.table_to_sheet(this.dataID);
    //  const worksheet = xlsx.utils.json_to_sheet(this.AllSysAudit);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "AllRep");
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
  