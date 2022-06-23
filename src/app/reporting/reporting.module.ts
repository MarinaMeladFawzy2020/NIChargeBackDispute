import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { AllreportComponent } from './allreport/allreport.component';
import { SharedModule } from '../shared/shared.module';
import { TicketlogsComponent } from './ticketlogs/ticketlogs.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AllreportComponent,
    TicketlogsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    SharedModule
  ]
})
export class ReportingModule { }
