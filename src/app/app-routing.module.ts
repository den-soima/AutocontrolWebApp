import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AutocontrolComponent } from './autocontrol/autocontrol.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: 'autocontrol',
    component: AutocontrolComponent,
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'report', component: ReportComponent },
  { path: 'report/:id', component: ReportComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
