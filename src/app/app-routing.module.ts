import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LinesComponent } from './lines/lines.component';
import { TestGridComponent } from './test-grid/test-grid.component';

const routes: Routes = [
  {path:'lines', component: LinesComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'testgrid', component: TestGridComponent},
  {path:'**', redirectTo: 'lines'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
