import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-pre-arp',
  templateUrl: './search-pre-arp.component.html',
  styleUrls: ['./search-pre-arp.component.css'],
  providers: [ DatePipe ]

})


export class SearchPreArpComponent implements OnInit {
  [x:string]:any;
  myForm!:FormGroup;
  @Output() getResponse = new EventEmitter;  
  userAction :any ="";
  userName :any ="";
  currentDate: any = new Date();
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'rolCase':new FormControl(''), 
      'caseStatus':new FormControl(''),
      'amount':new FormControl(''),
      'userName':new FormControl('')

    })
  }

  onSubmit(){
    console.log(this.myForm.value);
    var obj = {
      "rolCase": this.myForm.value?.rolCase,
      "amount": this.myForm.value?.amount,
      "caseStatus": this.myForm.value?.caseStatus,
      "userName": this.myForm.value?.userName,

  }
   this.getResponse.emit(obj);
  }

  reset(){
    this.myForm.reset();
    this.getResponse.emit("reset");

  }


}
