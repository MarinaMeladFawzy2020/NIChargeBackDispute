import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { AllreportComponent } from './allreport/allreport.component';
import { SharedModule } from '../shared/shared.module';
import { TicketlogsComponent } from './ticketlogs/ticketlogs.component';
import { SearchComponent } from './search/search.component';
import { PreArbComponent } from './pre-arb/pre-arb.component';
import { SearchPreArpComponent } from './search-pre-arp/search-pre-arp.component';
import { CreditDetailsComponent } from './credit-details/credit-details.component';
import { CreditSearchComponent } from './credit-search/credit-search.component';
import { IncomingCBComponent } from './incoming-cb/incoming-cb.component';
import { ChargeBackSearchComponent } from './charge-back-search/charge-back-search.component';
import { RepresentementComponent } from './representement/representement.component';
import { SearchRepresentementComponent } from './search-representement/search-representement.component';


@NgModule({
  declarations: [
    AllreportComponent,
    TicketlogsComponent,
    SearchComponent,
    PreArbComponent,
    SearchPreArpComponent,
    CreditDetailsComponent,
    CreditSearchComponent,
    IncomingCBComponent,
    ChargeBackSearchComponent,
    RepresentementComponent,
    SearchRepresentementComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    SharedModule
  ]
})
export class ReportingModule { }
