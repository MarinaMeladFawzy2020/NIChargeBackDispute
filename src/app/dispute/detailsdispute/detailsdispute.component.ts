import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DisputeService } from 'src/app/services/dispute.service';
import { EditdisputeComponent } from '../editdispute/editdispute.component';
import { HistorydisputeComponent } from '../historydispute/historydispute.component';
import { LinkeddisputeComponent } from '../linkeddispute/linkeddispute.component';

@Component({
  selector: 'app-detailsdispute',
  templateUrl: './detailsdispute.component.html',
  styleUrls: ['./detailsdispute.component.css']
})
export class DetailsdisputeComponent implements OnInit {
[x:string]:any;
checkNoFound :boolean = false;
allParamterNew :any =[];
allpar:any =[];
@ViewChild('linkeddispute') linkeddispute!: LinkeddisputeComponent;
@ViewChild('historydispute') historydispute!: HistorydisputeComponent;
@ViewChild('editdispute') editdispute!: EditdisputeComponent;

  constructor(private activeRoute: ActivatedRoute , private dataApi:DisputeService , private messageService:MessageService) { }

  ngOnInit(): void {
    this.allSections = [
    {'sectionCode':1 , 'sectionName': "Dispute Info" , "allParamter" : this.allParamterNew} ,
    {'sectionCode':2 , 'sectionName': "Jira Info" , "allParamter" : this.allParamterNew },
    {'sectionCode':3 , 'sectionName': "Transactio Info" , "allParamter" : this.allParamterNew },
    {'sectionCode':4 , 'sectionName': "Incoming Info" , "allParamter" : this.allParamterNew }
  ];
    this.dataRowFromTable = sessionStorage.getItem("disputeData");
    console.log(this.dataRowFromTable)
    this.checkNoFound = true;
    console.log(this.activeRoute.snapshot.params.id);
    console.log(parseInt(this.activeRoute.snapshot.params.id));
    this.disputeId = parseInt(this.activeRoute.snapshot.params.id);
    this.dataApi.getAllAttributeLabels().subscribe(
      Response=> {
        console.log(Response)
        this.titles = Response
        if(this.titles.length > 0){
          this.getDetails(this.disputeId);
        }
      });

  }

  getDetails(_disputeId :any){
    this.dataApi.getDisputeDetails(_disputeId).subscribe(
      Response=> {
        console.log(Response)
        this.leng = Response.length;
        console.log(this.leng);
        if(this.leng == 0){
          this.checkNoFound = true;
          this.emptyMessg = "No Data Found";
        }else{
          this.DataDetails = Response[0];
          if(this.DataDetails.link_STATUS == 'CMS Not Linked' && this.DataDetails.dispute_STATUS ==  'New'){
            this.showLinked = true;
          }
          if(this.DataDetails.link_STATUS == 'CMS Linked' && this.DataDetails.dispute_STATUS ==  'New'){
            this.showBackPending = true;
          }
          
          

          for(let x=0 ; x < this.allSections.length ; x++){
            console.log(this.allSections[x]);
            let newArr = this.titles.filter((e: { section_CODE: any; }) => e.section_CODE == this.allSections[x].sectionCode)
          //  console.log(newArr);
            this.allSections[x].allParamter = newArr;
            this.allpar=this.allSections[x].allParamter;
            // for(let z=0 ; z< this.allpar.length; z++){
            //   console.log(this.allpar[z].object_NAME)
            //   this.data = this.allpar[z];
            //   this.data["dataValue"] = 4;
            // }

          }
      
          this.checkNoFound = false;
           //call tab index=0
           this.handleChange({originalEvent: PointerEvent, index: 0});
        }
      },
      (error) => {                              
        console.log(error);
      // bootbox.alert({title: "<span style='color:#a33;font-weight: 500; font-size: 16px'>" + "Warning message" + "</span>", message: "<span style='color:Black;font-weight: 500; font-size: 16px'>" + "No data found" + "</span>"});
      }
     );
  }


  //LinkCMS
  LinkCMS(){
    this.dataApi.LinkCMS(this.DataDetails).subscribe(
      Response=> {
        console.log(Response)
        if(Response.code == 1 || Response.code == 2 || Response.code == 3 || Response.code == 4 ){
          this.messageService.add({severity:'success', summary: 'Success', detail: Response.message});
          this.getDetails(this.DataDetails.dispute_ID)
          // if(this.DataDetails.link_STATUS == 'CMS Not Linked' && this.DataDetails.dispute_STATUS ==  'New'){
          //   this.showLinked = true;
          // }
          if(Response.code == 1){
            this.showLinked = false;
          }
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: Response.message});
        }  
      },
      (error) => {                              
        console.log(error);
      // bootbox.alert({title: "<span style='color:#a33;font-weight: 500; font-size: 16px'>" + "Warning message" + "</span>", message: "<span style='color:Black;font-weight: 500; font-size: 16px'>" + "No data found" + "</span>"});
      }
     );
  }



  BackPending(){
    // this.changeStatus ={
    //   "dispute_ID": this.DataDetails.dispute_ID,
    //   "account_NO":  this.DataDetails.account_NO,
    //   "auth_ID":  this.DataDetails.auth_ID,
    //   "pan":  this.DataDetails.pan,
    //   "amount":  this.DataDetails.amocheckNoFoundunt,
    //   "bank_DISPUTE_REASON":  this.DataDetails.bank_DISPUTE_REASON,
    //   "dispute_DATE":  this.DataDetails.dispute_DATE,
    //   "dispute_STATUS": "Pending C/B",
    // }

    console.log(this.changeStatus);
  //  this.dataApi.UpdateDispute(this.changeStatus).subscribe(
      this.dataApi.updateDisputeStatus(this.DataDetails.dispute_ID,"Pending C/B").subscribe(

      Response=> {
        console.log(Response)
        if(Response.code == 1 ){
          this.messageService.add({severity:'success', summary: 'Success', detail: Response.message});
          this.getDetails(this.DataDetails.dispute_ID);
          this.showBackPending = false;
      
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: Response.message});
        }  
      },
      (error) => {                              
        console.log(error);
      }
     );

  }

  linkedDispute(){
    this.linkeddispute.getlinkedispute(this.DataDetails);
  }

  HistoryDispute(){
    this.historydispute.getHistorydispute(this.disputeId);
  }
  

  onClickEdit(){
    this.editdispute.getRowDispute(this.DataDetails);
  }

  //handel Action Reset 
  getDoneEdit($event: any) {
    console.log($event);
   // alert("emit")
    this.getDetails(this.disputeId);
  }
  

  handleChange(e:any) {
    console.log(e)
    var index = e.index;
    //alert(index);
    if(index == 0){
      this.HistoryDispute();
    }

  }



  closedManual() {
    var dialog = bootbox.dialog({
      title: 'Confirm Message',
      message: "<p>Are you Sure Close ?</p>",
      size: 'medium',
      closeButton: false,
      buttons: {
        
          ok: {
              label: "<i class='fa fa-check'></i>  OK",
              className: 'btn-success',
              callback: () => {
                console.log("closeDispute"+this.getDetails(this.disputeId))

                this.dataApi.closeDispute(2294).subscribe(
                  Response=> {
                    console.log("closeDispute"+Response)
                    // this.titles = Response
                    // if(this.titles.length > 0){
                    //   this.getDetails(this.disputeId);
                    // }
                  });
                console.log('OK clicked');
               // this.ngOnInit();
              }
          },
          cancel: {
            label: " <i class='fa fa-times'></i> Cancel",
            className: 'btn-danger',
            callback: () => {
                console.log('cancel clicked');
            }
        }
        
      }
    });
  }
}


    // setTimeout(() => {
      //  // console.log(""); 
      // }, 2000)