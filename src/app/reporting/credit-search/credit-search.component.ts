import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-credit-search',
  templateUrl: './credit-search.component.html',
  styleUrls: ['./credit-search.component.css'],
  providers: [ DatePipe ]
})
export class CreditSearchComponent implements OnInit {
  [x:string]:any;
  myForm!:FormGroup;
  @Output() getResponse = new EventEmitter;  
  entryCode:any='';
  dbCard:any='';

  fromEntryDate :any ='';
  toEntryDate :any ='';
  userId:any ='';
  fromTrxDate:any='';
  toTrxDate:any='';
  // userAction :any ="";
  // userName :any ="";
  currentDate: any = new Date();
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'entryCode':new FormControl(''), 
      'dbCard':new FormControl(''),
      'fromEntryDate':new FormControl(''),
      'toEntryDate':new FormControl(''),
      'userId':new FormControl(''),
      'fromTrxDate':new FormControl(''),
      'toTrxDate':new FormControl(''),
    })
  }

  onSubmit(){
    console.log(this.myForm.value);
    var obj = {
      "fromEntryDate": this.datePipe.transform(this.myForm.value?.fromEntryDate , 'MM/dd/yyyy'),
      "toEntryDate": this.datePipe.transform(this.myForm.value?.toEntryDate , 'MM/dd/yyyy'),
      "entryCode": this.myForm.value?.entryCode,
      "userId": this.myForm.value?.userId,
      "dbCard": this.myForm.value?.dbCard,
      "fromTrxDate": this.datePipe.transform(this.myForm.value?.fromTrxDate , 'MM/dd/yyyy'),
      "toTrxDate": this.datePipe.transform(this.myForm.value?.toTrxDate , 'MM/dd/yyyy'),
  }
   this.getResponse.emit(obj);
  }

  reset(){
    this.myForm.reset();
    this.getResponse.emit("reset");

  }


}
