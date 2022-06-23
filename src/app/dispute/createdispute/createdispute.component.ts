import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DisputeService } from 'src/app/services/dispute.service';
import { LookupsService } from 'src/app/services/lookups.service';
declare var $: any

@Component({
  selector: 'app-createdispute',
  templateUrl: './createdispute.component.html',
  styleUrls: ['./createdispute.component.css'],
  providers: [ DatePipe ]

})
export class CreatedisputeComponent implements OnInit {
[x:string]:any;
myForm!:FormGroup
@Output() getResponse = new EventEmitter;
// Status: any[] =  ['Status 1', 'Status 2' ,'Status 3' ]

  constructor( private dataApi:DisputeService , private messageService: MessageService , private lookupApi: LookupsService ,   private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'pan':new FormControl('',[Validators.required]), //Validators.pattern("[0-9]{11}")
      'auth_ID':new FormControl('',[Validators.required]),
      'amount':new FormControl('',[Validators.required]),
      'dispute_DATE':new FormControl('',[Validators.required]),
      'account_NO':new FormControl('',[Validators.required]),
      'dispute_REASON':new FormControl('',[Validators.required]),
      'terminal_ID':new FormControl(''),
      'stan':new FormControl(''),
      'type':new FormControl(''),
      'reference':new FormControl(''),
      'dispute_DESCRIPTION':new FormControl(''),
    })
    
  }

  onReset(){
    this.reset()
  }
  onChangeCategor($event:any){
  console.log($event.value)
  this.selCat =$event.value.dispute_REASON;
  this.AllDiscriptionsFilter = this.AllDiscriptions.filter((e: {dispute_REASON: any;}) => e.dispute_REASON == this.selCat)

  }

  onSubmit(){
    console.log(this.myForm.value);
    var obj = {
      "pan":this.myForm.value?.pan,
      "auth_ID": this.myForm.value?.auth_ID,
      "amount": this.myForm.value?.amount,
      "dispute_DATE": this.datePipe.transform(this.myForm.value?.dispute_DATE , 'MM/dd/yyyy'),
      "account_NO": this.myForm.value?.account_NO,
      "bank_DISPUTE_REASON":this.myForm.value?.dispute_REASON,
      "terminal_ID": this.myForm.value?.terminal_ID,
      "stan": this.myForm.value?.stan,
      "type": this.myForm.value?.type,
      "reference": this.myForm.value?.reference,
      "bank_DISPUTE_DISCRIPTION": this.myForm.value?.dispute_DESCRIPTION,

    }
    console.log(obj)
    this.dataApi.CreateDispute(obj).subscribe((result:any)=>{
      console.log(result)
 
      if(result.code == 1){
       // this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
       this.getResponse.emit("hh");
      
     bootbox.alert({
        title: "<span style='color:#218838 ;font-weight: 400; font-size: 16px;'>"+"Success Message"+"</span>  </i>",
        message: "<span style='color:#218838 ;font-weight: 400; font-size: 16px;'>"+ result.message+"</span>  </i>",
        callback: function(){
            $('#createdispute').modal('hide');
        }
    });

   
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
      }
      
    },(error:any)=>{
      console.log(error)
      this.messageService.add({severity:'error', summary: 'Error', detail:"error"});
    })
  }

  reset(){
    this.myForm.reset();

  }

}



 // this.lookupApi.getDeviceType().subscribe((result:any)=>{
    //   console.log("AlldeviceTYPE")
    //   console.log(result)
    //   this.AlldeviceTYPE = result;
    // });

    // this.lookupApi.getTrxType().subscribe((result:any)=>{
    //   console.log("AllTrxType")
    //   console.log(result)
    //   this.AllTrxType = result;
    // });

    // this.lookupApi.getSchemaType().subscribe((result:any)=>{
    //   console.log("AllSchemaType")
    //   console.log(result)
    //   this.AllSchemaType = result;
    // });

    // this.lookupApi.getAllBanks().subscribe((result:any)=>{
    //   console.log("AllBanks")
    //   console.log(result)
    //   this.AllBanks = result;
    // });


    // this.lookupApi.getVisaIncomingCB(21).subscribe((result:any)=>{
    //   console.log("AllVisaIncomingCB")
    //   console.log(result)
    //   this.AllVisaIncomingCB = result;
    // });

    
    // this.lookupApi.getPresentments(12).subscribe((result:any)=>{
    //   console.log("AllPresentments")
    //   console.log(result)
    //   this.AllPresentments = result;
    // });

    // this.lookupApi.getAllCategory().subscribe((result:any)=>{
    //   console.log("AllCategory")
    //   console.log(result)
    //   this.AllCategory = result;
    // });

    // this.lookupApi.getAllDiscriptions().subscribe((result:any)=>{
    //   console.log("AllDiscriptions")
    //   console.log(result)
    //   this.AllDiscriptions = result;
    //   this.AllDiscriptionsFilter = [];
    // });
