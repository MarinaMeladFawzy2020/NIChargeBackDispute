import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
[x:string]:any;
  constructor(private router: Router ) {
    this.userName = sessionStorage.getItem('userName')
   }

  ngOnInit(): void {
  }
  logout(){
    this.router.navigate(["/"]);
    sessionStorage.clear()
  }
}
