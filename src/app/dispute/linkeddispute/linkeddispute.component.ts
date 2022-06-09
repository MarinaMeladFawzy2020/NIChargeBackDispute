import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { DisputeService } from 'src/app/services/dispute.service';
declare var $: any
@Component({
  selector: 'app-linkeddispute',
  templateUrl: './linkeddispute.component.html',
  styleUrls: ['./linkeddispute.component.css']
})
export class LinkeddisputeComponent implements OnInit {
  [x:string]:any;
  loading:boolean=true;
  selectedTrans :any= [];
  constructor(private dataApi: DisputeService) { }

  ngOnInit(): void {
  
    this.cols = [
      { field: 'dispute_ID', header: 'Dispute ID' , display:0},
      { field: 'account_NO', header: 'Account NO' , display:1},
      { field: 'amount', header: 'Amount' , display:1},
      { field: 'approval_CODE', header: 'Approval Code' , display:1 },
      { field: 'arn', header: 'Arn' , display:1 },
      { field: 'device_TYPE', header: 'Device Type' , display:1 },
      { field: 'link_TRANSACTION_ID', header: 'link Transaction ID' , display:0},
      { field: 'trancode', header: 'Transaction Code' , display:1 },
      { field: 'transaction_ENTRY_MODE', header: 'Transaction Entry Mode' , display:0},
      { field: 'transaction_TYPE', header: 'Transaction Type' , display:1 },
      { field: 'trx_CURRENCY', header: 'Trx Currency' , display:0 },
      { field: 'trx_DATE', header: 'Trx Date' , display:0 },
      { field: 'two_ID', header: 'Two ID' , display:0 },
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

getlinkedispute(DataDetails:any){
console.log(DataDetails);
this.DataDetails1 = DataDetails; 
this.checkData=true;
this.dataApi.linkedDisputeById(DataDetails.dispute_ID).subscribe(
  Response=> {
    console.log(Response);
    this.linkedDispute = Response;
    this.loading=false;
  },
  (error) => {                              
    console.log(error);
  // bootbox.alert({title: "<span style='color:#a33;font-weight: 500; font-size: 16px'>" + "Warning message" + "</span>", message: "<span style='color:Black;font-weight: 500; font-size: 16px'>" + "No data found" + "</span>"});
  }
 );

  }

  selectRow(_f:any){
    console.log(_f)
    this.dataTransaction = _f;
    console.log(this.selectedTrans)
  }

  onSubmit(){
    console.log(this.dataTransaction)
    console.log(this.selectedTrans)
    console.log(this.selectedTrans.length)
    if(this.selectedTrans.length == 0){
     bootbox.alert({title: "<span style='color:#a33;font-weight: 500; font-size: 16px'>" + "Warning message" + "</span>", message: "<span style='color:Black;font-weight: 500; font-size: 16px'>" + "Must Be Selected One Row" + "</span>"});
    }else{
    this.dataApi.LinkManualCMS(this.selectedTrans.dispute_ID , this.selectedTrans.link_TRANSACTION_ID).subscribe(
      Response=> {
        console.log(Response);
        if(Response.code == 1) {
          bootbox.alert({
            title: "<span style='color:#218838 ;font-weight: 400; font-size: 16px;'>"+"Success Message"+"</span>  </i>",
            message: "<span style='color:#218838 ;font-weight: 400; font-size: 16px;'>"+ Response.message+"</span>  </i>",
            callback: function(){
                $('#linkeddispute').modal('hide');
            }
        });
        this.getlinkedispute(this.DataDetails1);
        }else{
          bootbox.alert({title: "<span style='color:#a33;font-weight: 500; font-size: 16px'>" + "Warning message" + "</span>", message: "<span style='color:Black;font-weight: 500; font-size: 16px'>" + Response.message + "</span>"});

        }

      },
      (error) => {                              
        console.log(error);
      // bootbox.alert({title: "<span style='color:#a33;font-weight: 500; font-size: 16px'>" + "Warning message" + "</span>", message: "<span style='color:Black;font-weight: 500; font-size: 16px'>" + "No data found" + "</span>"});
      }
     );
    }

  }
  
  onReset(){
    this.selectedTrans = [];
  }

  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
    // console.log( document.getElementById('dt1'));
    this.dataID = document.getElementById('dt1');
    // const worksheet = xlsx.utils.table_to_sheet(this.dataID);
      const worksheet = xlsx.utils.json_to_sheet(this.linkedDispute);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "linkedDispute");
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
