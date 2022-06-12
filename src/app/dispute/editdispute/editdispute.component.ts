import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DisputeService } from 'src/app/services/dispute.service';
declare var $: any

@Component({
  selector: 'app-editdispute',
  templateUrl: './editdispute.component.html',
  styleUrls: ['./editdispute.component.css'],
  providers: [ DatePipe ]
})
export class EditdisputeComponent implements OnInit {
  [x:string]:any;
  myForm!:FormGroup;
  dataDetails:any=[]; 
  afterSave:boolean=true;
  @Output() getResponse1 = new EventEmitter;
  constructor( private dataApi:DisputeService , private messageService: MessageService ,  private datePipe: DatePipe) { }

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

  getRowDispute(_dataRow:any){
  //  alert("hh")
    console.log(_dataRow)
    this.dataDetails = _dataRow ;
    Object.keys(this.dataDetails).forEach(key => {
      //  console.log("key: ", key); console.log("Value: ", _f[key]); console.log("length: ", _f[key].length); console.log("typeof: ", typeof(_f[key]));
      if(this.dataDetails[key] == null){
        console.log("Value: ", this.dataDetails[key]);
        this.dataDetails[key] = " ";
      }
    });
  }

  onSubmit(){
    console.log(this.myForm.value);
    this.afterSave = true;
    var obj = {
      "dispute_ID":this.dataDetails.dispute_ID,
      "pan":this.myForm.value?.pan,
      "auth_ID": this.myForm.value?.auth_ID,
      "amount": this.myForm.value?.amount,
      "dispute_DATE": this.datePipe.transform(this.myForm.value?.dispute_DATE , 'MM/dd/yyyy'),
      "account_NO": this.myForm.value?.account_NO,
      "dispute_REASON":this.myForm.value?.dispute_REASON,
      "terminal_ID": this.myForm.value?.terminal_ID,
      "stan": this.myForm.value?.stan,
      "type": this.myForm.value?.type,
      "reference": this.myForm.value?.reference,
      "dispute_DESCRIPTION": this.myForm.value?.dispute_DESCRIPTION,
      "dispute_STATUS": this.dataDetails.dispute_STATUS
    }
    console.log(obj)
    this.dataApi.UpdateDispute(obj).subscribe((result:any)=>{
      console.log(result)
      if(result.code == 1){
        this.afterSave = false;
       // this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
       this.getResponse1.emit("edit");
      
     bootbox.alert({
        title: "<span style='color:#218838 ;font-weight: 400; font-size: 16px;'>"+"Success Message"+"</span>  </i>",
        message: "<span style='color:#218838 ;font-weight: 400; font-size: 16px;'>"+ result.message+"</span>  </i>",
        callback: function(){
            $('#editdispute').modal('hide');
            window.location.reload();
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
  // this.myForm.reset();
   this.getResponse1.emit("edit");
  }
}
