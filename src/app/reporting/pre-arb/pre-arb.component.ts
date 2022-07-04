import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-pre-arb',
  templateUrl: './pre-arb.component.html',
  styleUrls: ['./pre-arb.component.css']
})


export class PreArbComponent implements OnInit {
  [x:string]:any;
  first:any = 0;
  last:any = 0;
  totalRecords:any = 0;
  totalRow:any = 50;
    constructor(private dataApi: ReportingService) { }
  
    ngOnInit(): void {
      this.AllPre = [];
      this.cols = [
        { field: 'userName', header: 'user ', display:1},
        { field: 'rolCase', header: 'role Case', display:1},
        { field: 'caseStatus', header: 'Case Status' , display:1},
        { field: 'amount', header: 'Amount',display:1 },
        { field: 'arnRetreivalRef', header: 'ARN Retreival Ref', display:1},
        { field: 'daysToACt', header: 'Days To ACt' , display:1},
        { field: 'dc', header: 'DC',display:1 },

        { field: 'fraudCls', header: 'Fraud Cls', display:1},
        { field: 'jr', header: 'JR' , display:1},
        { field: 'lastAction', header: 'Last Action',display:1 },

       { field: 'mccCode', header: 'MCC Code', display:1},
        { field: 'memberCaseNumber', header: 'Member Case#' , display:1},
        { field: 'merchantName', header: 'Merchant Name',display:1 },

        { field: 'motoInd', header: 'Moto Ind', display:1},
        { field: 'networkId', header: 'Network ID' , display:1}    ];
  
    
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
  
    getPreArb(_dataobj:any){
      this.loading = true;
      this.dataApi.getPreArb(_dataobj).subscribe(
        Response=> {
          console.log(Response)
          this.loading = false;
          this.len = Response.totalItems;
          if(this.len > 0){
            this.AllPre = Response.preList;
          }else if(this.len == 0){
            this.AllPre = {};
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
      this.AllPre = [];
    }else{
      this.getPreArb(this.objectbySearch);
    }
  
  }
  
  
  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
  console.log( "dt in pre arp"+document.getElementById('dt'));
    this.dataID = document.getElementById('dt');
    const worksheet = xlsx.utils.table_to_sheet(this.dataID);
    //  const worksheet = xlsx.utils.json_to_sheet(this.AllSysAudit);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "AllPre");
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
  