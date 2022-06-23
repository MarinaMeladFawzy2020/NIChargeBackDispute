import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { DisputeService } from 'src/app/services/dispute.service';
import { EditdisputeComponent } from '../editdispute/editdispute.component';

@Component({
  selector: 'app-getalldispute',
  templateUrl: './getalldispute.component.html',
  styleUrls: ['./getalldispute.component.css']
})
export class GetalldisputeComponent implements OnInit {
[x:string]:any;
loading:boolean=true;
@ViewChild('editdispute') editdispute!: EditdisputeComponent;

  constructor(private dataApi : DisputeService  , private router:Router)  { }
  
  ngOnInit(): void {
    this.getAllDispute({});
    this.cols = [
      { field: 'pan', header: 'Pan' , display:1 },
      { field: 'auth_ID', header: 'Auth ID' , display:1 },
      { field: 'amount', header: 'Amount' , display:1 },
      { field: 'account_NO', header: 'Account NO' , display:1 },
      { field: 'dispute_REASON', header: 'Dispute Reason' , display:1 },
      { field: 'bank_DISPUTE_DISCRIPTION', header: 'Comments' , display:0},
      { field: 'dispute_STATUS', header: 'Dispute Status', display:1 },
      { field: 'dispute_DATE', header: 'Dispute Date' , display:1  },
      { field: 'received_DATE', header: 'Received Date' , display:1  },
      { field: 'link_STATUS', header: 'link Status' , display:0 },
      { field: 'link_TRANSACTION_ID', header: 'link Transaction ID' , display:0 },
      { field: 'terminal_ID', header: 'Terminal ID' , display:0 },
      { field: 'type', header: 'Type' , display:0 },
      { field: 'stan', header: 'Stan' , display:0 },
      { field: 'reference', header: 'Reference' , display:0 },
      { field: 'dispute_DESCRIPTION', header: 'Dispute Description' , display:0 },
      { field: 'dispute_ID', header: 'Dispute ID' , display:0},
      { field: 'sla', header: 'SLA' , display:1},
      { field: 'timeframe_STATUS', header: 'Timeframe Status' , display:0},
      { field: 'timeframe_STARTED', header: 'Timeframe Started' , display:0},
      { field: 'timeframe_END', header: 'Timeframe END' , display:0},
      
  ];
  this.selectedcols = this.cols.filter((col: any) =>  col.display == 1);
  this._selectedColumns =  this.selectedcols ;
 //this._selectedColumns =  this.cols ;
  }

  
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }



  set selectedColumns(val: any[]) {
    //restore original order
   // this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
   this.selectedcols = val;
   this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
   this._selectedColumns =  this.selectedcols
   console.log(this.selectedcols)
  }

  getAllDispute(_dataobj:any){
    this.loading = true;
    this.dataApi.findDispute(0,500,_dataobj).subscribe(
      Response=> {
        console.log(Response)
        this.loading = false;
        this.len = Response.totalItems;
        if(this.len > 0){
          this.AllDispute = Response.Disputes;
        }else if(this.len == 0){
          this.AllDispute = {};
        }

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
     const worksheet = xlsx.utils.table_to_sheet(this.dataID);
   // const worksheet = xlsx.utils.json_to_sheet(this.AllDispute);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "disputeList");
  });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  //npm install filesaver
  //npm install file-saver
  //npm install @types/file-saver --save-dev
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_' + formatDate(new Date(), "dd-MMM-YYYY hh:mm", 'en-US') + EXCEL_EXTENSION);
}



onClickDetails(_f :any){
  console.log(_f)
  this.router.navigate([`dispute/${_f.dispute_ID}`]);
  sessionStorage.setItem("disputeData",_f)
 // this.router.navigate([`dispute/viewdetails`]);

}

getDoneCreate($event: any) {
  console.log($event);
  this.getAllDispute({});
}

//handel Action Reset 
getDoneEdit($event: any) {
  console.log($event);
 // alert("emit")
  this.getAllDispute({});
}

getDoneSearch($event: any) {
  this.loading = true;
  console.log($event);
  this.objectbySearch = $event;
  this.loading = false;
  this.getdatabysearch = true;
  this.getAllDispute(this.objectbySearch);
}


onClickEdit(dataRow:any){
  console.log(dataRow)
  this.editdispute.getRowDispute(dataRow);
}

calculateDiff(dispute_DATE :any , received_DATE :any ){
 // console.log(new Date(dispute_DATE));
 // console.log(typeof(dispute_DATE));
  let diffDays = Math.floor((new Date(received_DATE).getTime() - new Date(dispute_DATE).getTime()) / 1000 / 60 / 60 / 24);
 // console.log(diffDays);
  return diffDays ;
}

}
