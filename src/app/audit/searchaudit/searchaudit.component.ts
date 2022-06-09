import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuditService } from 'src/app/services/audit.service';

@Component({
  selector: 'app-searchaudit',
  templateUrl: './searchaudit.component.html',
  styleUrls: ['./searchaudit.component.css'],
  providers: [ DatePipe ]
})
export class SearchauditComponent implements OnInit {

  [x:string]:any;
  myForm!:FormGroup;
  @Output() getResponse = new EventEmitter;  
  fromDate :any ='';
  toDate :any ='';
  userAction :any ="";
  userName :any ="";
  currentDate: any = new Date();


  constructor( private dataApi:AuditService , private messageService : MessageService , private datePipe: DatePipe) { }

  ngOnChanges(changes:any){
 // alert("h")
  }
  ngAfterViewInit() {
    //alert("h")

  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'fromDate':new FormControl(''), // {value: 'Rahul', disabled: true} ,[Validators.required] Validators.pattern("[0-9]{11}")
      'toDate':new FormControl(''),
      'userAction':new FormControl(''),
      'userName':new FormControl(''),
    })
    
    

  }


  onSubmit(){
    console.log(this.myForm.value);
    var obj = {
      "fromDate": this.datePipe.transform(this.myForm.value?.fromDate , 'MM/dd/yyyy'),
      "toDate": this.datePipe.transform(this.myForm.value?.toDate , 'MM/dd/yyyy') ,
      "userAction": this.myForm.value?.userAction,
      "userName": this.myForm.value?.userName
  }
   this.getResponse.emit(obj);

  }

  reset(){
    this.myForm.reset();
    this.getResponse.emit({});

  }



}
