import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { DisputeService } from 'src/app/services/dispute.service';

@Component({
  selector: 'app-historydispute',
  templateUrl: './historydispute.component.html',
  styleUrls: ['./historydispute.component.css']
})
export class HistorydisputeComponent implements OnInit {
[x:string]:any;
loading:boolean=true;

  constructor(private dataApi : DisputeService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'history_ID', header: 'history ID', display:0},
      { field: 'user_NAME', header: 'User Name', display:1},
      { field: 'status_BEFORE', header: 'From Status' , display:1},
      { field: 'current_STATUS', header: 'To Status', display:1},
      { field: 'status_TIME', header: 'Status Time',display:1 },
      



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


  getHistorydispute(_dispute_ID:any){
   
    this.dataApi.getDisputeHistory(_dispute_ID).subscribe(
      Response=> {
        console.log(Response);
        this.historyDispute = Response;
        this.loading=false;
      },
      (error) => {                              
        console.log(error);
      // bootbox.alert({title: "<span style='color:#a33;font-weight: 500; font-size: 16px'>" + "Warning message" + "</span>", message: "<span style='color:Black;font-weight: 500; font-size: 16px'>" + "No data found" + "</span>"});
      }
     );

  }


  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
    // console.log( document.getElementById('dt1'));
    this.dataID = document.getElementById('dt1');
    // const worksheet = xlsx.utils.table_to_sheet(this.dataID);
      const worksheet = xlsx.utils.json_to_sheet(this.historyDispute);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "HistoryDispute");
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
