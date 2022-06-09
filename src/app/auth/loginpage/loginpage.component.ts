import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  loginForm!:FormGroup
  [x:string]:any;

  constructor(private authService:AuthService,private router:Router , private messageService: MessageService) { 
    let token = sessionStorage.getItem('token')
    if(token){
      this.router.navigate(['/dashboard'])
    }
  }

  // {
  //   "userName": "root",
  //   "userPass": "84D9EAA2911748A55534B131E6306291"
  // }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'userName':new FormControl('',[Validators.required]),
      'userPass':new FormControl('',[Validators.required])
    })
    
  }


  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe((result:any)=>{
      console.log(result)
      if(result.code == 1){
        this.router.navigate(['/dashboard'])
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Done successfully'});
    
      }else{
        this.showErrorMessage = "Invalid username or password";
        this.messageService.add({severity:'error', summary: 'Error', detail: this.showErrorMessage});

      }
   
      
    },(error:any)=>{
      console.log(error)
      this.showErrorMessage = "Invalid username or password";
      this.messageService.add({severity:'error', summary: 'Error', detail: this.showErrorMessage});
      
    })
  }



  
}
