import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsdisputeComponent } from './detailsdispute/detailsdispute.component';
import { GetalldisputeComponent } from './getalldispute/getalldispute.component';

const routes: Routes = [
  {path:'', component: GetalldisputeComponent},
  {path:':id', component: DetailsdisputeComponent}, //parse id
  {path:'viewdetails', component: DetailsdisputeComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisputeRoutingModule { }
