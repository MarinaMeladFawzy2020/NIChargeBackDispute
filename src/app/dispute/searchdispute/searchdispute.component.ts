import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DisputeService } from 'src/app/services/dispute.service';

@Component({
  selector: 'app-searchdispute',
  templateUrl: './searchdispute.component.html',
  styleUrls: ['./searchdispute.component.css'],
  providers: [ DatePipe ]

})
export class SearchdisputeComponent implements OnInit {
  [x:string]:any;
  myForm!:FormGroup;
  @Output() getResponse = new EventEmitter;  

  // pan:any =""
  // auth_ID:any =''
  // amount:any =''
  // dispute_DATE:any =""
  // account_NO:any =''
  // dispute_REASON:any =''


  constructor( private dataApi:DisputeService , private messageService : MessageService ,  private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'pan':new FormControl(''), // {value: 'Rahul', disabled: true} ,[Validators.required] Validators.pattern("[0-9]{11}")
      'auth_ID':new FormControl(''),
      'amount':new FormControl(''),
      'dispute_DATE':new FormControl(''),
      'account_NO':new FormControl(''),
      'dispute_REASON':new FormControl(''),
    })
    
  }


  onSubmit(){
    console.log(this.myForm.value);
   // console.log(this.myForm.get('pan')?.value)
   var obj = {
    "account_NO":  this.myForm.value?.account_NO ,
    "amount":  this.myForm.value?.amount ,
    "auth_ID":  this.myForm.value?.auth_ID ,
    "dispute_DATE": this.datePipe.transform(this.myForm.value?.dispute_DATE , 'MM/dd/yyyy'),
    "dispute_REASON": this.myForm.value?.dispute_REASON ,
    "pan": this.myForm.value?.pan 
  }
   this.getResponse.emit(obj);

  }

  reset(){
    this.myForm.reset();
    this.getResponse.emit({});
  }

  
}
