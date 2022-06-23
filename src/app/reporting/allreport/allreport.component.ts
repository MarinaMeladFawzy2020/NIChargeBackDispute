import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allreport',
  templateUrl: './allreport.component.html',
  styleUrls: ['./allreport.component.css']
})
export class AllreportComponent implements OnInit {
  [x:string]:any;

  constructor() { }

  ngOnInit(): void {
  }

  handleChange(e:any) {
    console.log(e)
    var index = e.index;
    //alert(index);
    if(index == 0){
    }

  }
}
