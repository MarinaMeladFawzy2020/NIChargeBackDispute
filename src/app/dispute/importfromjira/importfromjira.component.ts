import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DisputeService } from 'src/app/services/dispute.service';
declare var $: any

@Component({
  selector: 'app-importfromjira',
  templateUrl: './importfromjira.component.html',
  styleUrls: ['./importfromjira.component.css']
})
export class ImportfromjiraComponent implements OnInit {
  [x:string]:any;
  myForm!:FormGroup
  constructor( private dataApi : DisputeService , private messageService: MessageService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'ticket_ID':new FormControl('',[Validators.required]), //Validators.pattern("[0-9]{11}")
    })


  }

  onSubmit(){
    this.ticket_ID = this.myForm.value?.ticket_ID
    this.dataApi.getAttachment( this.ticket_ID).subscribe((result:any)=>{
      console.log(result);
      if(result.code == 1){       
        bootbox.alert({
         title: "<span style='color:#218838 ;font-weight: 400; font-size: 16px;'>"+"Success Message"+"</span>  </i>",
         message: "<span style='color:#218838 ;font-weight: 400; font-size: 16px;'>"+ result.message+"</span>  </i>",
         callback: function(){
             $('#importFromjira').modal('hide');
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

   
 
}
