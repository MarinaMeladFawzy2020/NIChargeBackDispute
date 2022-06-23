import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ DatePipe ]

})
export class SearchComponent implements OnInit {
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
      'isskey':new FormControl(''), 
      'assignee':new FormControl(''),
      'fromDate':new FormControl(''),
      'toDate':new FormControl(''),
      'status':new FormControl(''),
    })
  }

  onSubmit(){
    console.log(this.myForm.value);
    var obj = {
      "fromDate": this.datePipe.transform(this.myForm.value?.fromDate , 'MM/dd/yyyy'),
      "toDate": this.datePipe.transform(this.myForm.value?.toDate , 'MM/dd/yyyy'),
      "isskey": this.myForm.value?.isskey,
      "status": this.myForm.value?.status,
      "assignee": this.myForm.value?.assignee,
  }
   this.getResponse.emit(obj);
  }

  reset(){
    this.myForm.reset();
    this.getResponse.emit("reset");

  }


}
