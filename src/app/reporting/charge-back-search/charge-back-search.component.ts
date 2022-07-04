import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-charge-back-search',
  templateUrl: './charge-back-search.component.html',
  styleUrls: ['./charge-back-search.component.css'],
  providers: [ DatePipe ]

})
export class ChargeBackSearchComponent implements OnInit {
  [x:string]:any;
  myForm!:FormGroup;
  @Output() getResponse = new EventEmitter;  
  fromDate :any ='';
  toDate :any ='';
  userAction :any ="";
  userName :any ="";
  currentDate: any = new Date();
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'arn':new FormControl(''), 
      'bank':new FormControl(''),
      'fromDate':new FormControl(''),
      'toDate':new FormControl(''),
      'pan':new FormControl(''),
      'rolCaseNumber':new FormControl(''),
      'authID':new FormControl(''),
    })
  }


  onSubmit(){
    console.log(this.myForm.value);
    var obj = {
      "fromDate": this.datePipe.transform(this.myForm.value?.fromDate , 'MM/dd/yyyy'),
      "toDate": this.datePipe.transform(this.myForm.value?.toDate , 'MM/dd/yyyy'),
      "arn": this.myForm.value?.arn,
      "pan": this.myForm.value?.pan,
      "bank": this.myForm.value?.bank,
      "rolCaseNumber": this.myForm.value?.rolCaseNumber,
      "authID": this.myForm.value?.authID,


  }
   this.getResponse.emit(obj);
  }

  reset(){
    this.myForm.reset();
    this.getResponse.emit("reset");

  }


}
