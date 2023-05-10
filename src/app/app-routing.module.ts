import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AutocontrolComponent } from './autocontrol/autocontrol.component';
import { ReportComponent } from './report/report.component';
import { TestGridComponent } from './test-grid/test-grid.component';

const routes: Routes = [
  { path: 'autocontrol', component: AutocontrolComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'testgrid', component: TestGridComponent },
  { path: 'report', component: ReportComponent },
  { path: 'report/:id', component: ReportComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
