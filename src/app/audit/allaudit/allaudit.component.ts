import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { PrimeNGConfig } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { AuditService } from 'src/app/services/audit.service';

@Component({
  selector: 'app-allaudit',
  templateUrl: './allaudit.component.html',
  styleUrls: ['./allaudit.component.css']
})
export class AllauditComponent implements OnInit {
[x:string]:any;
first:any = 0;
last:any = 0;
totalRecords:any = 0;
totalRow:any = 100;
getdatabysearch:boolean = false;
@ViewChild('paginator', { static: true }) paginator!: Paginator

  constructor(private dataApi:AuditService) { }


  ngOnInit(): void {
   // alert("ngOnInit")

    this.getAllaudit(0, 100 ,1 , 100 , {})
    //this.totalRecords = 500;
    // this.paginate({page: 1, first: 0, rows: 10, pageCount: 5});

    this.cols = [
      { field: 'user_NAME', header: 'user_NAME' , display:1},
      { field: 'user_ACTION', header: 'user_ACTION',display:1 },
      { field: 'audit_ID', header: 'audit_ID', display:1},
      { field: 'date_TIME', header: 'date_TIME', display:1}
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


  getAllaudit(_pageNo:any , _totalSize:any , _first:any ,_last:any , _fdata:any){
    this.loading = true;
    this.pageNO = _pageNo
    this.pageSize = _totalSize
    this.dataApi.findAudit(this.pageNO, this.pageSize , _fdata).subscribe(
      Response=> {
        console.log(Response)
        this.AllSysAudit = Response.SysAudit;
        this.totalItems = Response.totalItems;
        this.totalRecords = Response.totalItems;
        this.totalPages = Response.totalPages;
        this.currentPage = Response.currentPage;
        this.first= _first;
        this.last = _last;
        this.loading = false;
   
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
    const worksheet = xlsx.utils.json_to_sheet(this.AllSysAudit);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "SysAudit");
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


paginate(event:any) {
  console.log(event);
  console.log("page" +  event.page);
  console.log("first" + event.first);
  console.log("rows" + event.rows);
  console.log("pageCount" + event.pageCount);

  this.first= event.first + 1;
  this.last = (event.page +1) *  event.rows;
  if(event.page ==  event.pageCount -1){
    //alert("kk")
    this.last = this.totalRecords ;
  }

  if(this.getdatabysearch == false){
    this.getAllaudit(event.page,event.rows , this.first , this.last , {})
  }

  if(this.getdatabysearch == true){
    console.log(this.objectbySearch)
   // alert("ss")
    this.getAllaudit(event.page, event.rows , this.first , this.last , this.objectbySearch)
  }

}

// data Search 
getDoneSearch($event: any) {
  this.loading = true;
  console.log($event);
  this.objectbySearch = $event;
  this.loading = false;
  this.getdatabysearch = true;
  this.getAllaudit(0, 100 ,1 , 100 , this.objectbySearch);
 // this.paginate({page: 0, first: 0, rows: 10, pageCount: 0});

 console.log(this.paginator)

 
}

changeFilter(){
  alert("jj")
}

}
