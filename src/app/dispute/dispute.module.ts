import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisputeRoutingModule } from './dispute-routing.module';
import { GetalldisputeComponent } from './getalldispute/getalldispute.component';
import { CreatedisputeComponent } from './createdispute/createdispute.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsdisputeComponent } from './detailsdispute/detailsdispute.component';
import { SearchdisputeComponent } from './searchdispute/searchdispute.component';
import { LinkeddisputeComponent } from './linkeddispute/linkeddispute.component';
import { HistorydisputeComponent } from './historydispute/historydispute.component';
import { EditdisputeComponent } from './editdispute/editdispute.component';
import { ImportfromjiraComponent } from './importfromjira/importfromjira.component';


@NgModule({
  declarations: [
    GetalldisputeComponent,
    CreatedisputeComponent,
    DetailsdisputeComponent,
    SearchdisputeComponent,
    LinkeddisputeComponent,
    HistorydisputeComponent,
    EditdisputeComponent,
    ImportfromjiraComponent , 
  ],
  imports: [
    CommonModule,
    DisputeRoutingModule,
    SharedModule

  ]
})
export class DisputeModule { }
