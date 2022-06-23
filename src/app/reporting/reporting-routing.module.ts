import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllreportComponent } from './allreport/allreport.component';

const routes: Routes = [
  {path:'', component: AllreportComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
