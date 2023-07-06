import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import {
//   DIALOG_SERVICE,
//   SdkServicesBaseModule,
// } from '@proleit/sdk-services-base';
import { AutocontrolComponent } from './components/autocontrol/autocontrol.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SdkComponentsCommonModule } from '@proleit/sdk-components-common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import '@progress/kendo-angular-intl/locales/en/all';
import { SdkComponentsGridModule } from '@proleit/sdk-components-grid';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule, DialogService } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReportComponent } from './components/report/report.component';
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ReportDataComponent } from './components/report/report-data/report-data.component';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { MachineErrorComponent } from './components/report/report-data/machine-error/machine-error.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { EfficiencyComponent } from './components/report/report-data/efficiency/efficiency.component';
import { StatesGraphComponent } from './components/report/report-data/states-graph/states-graph.component';
import { ReportHeaderComponent } from './components/report/report-data/report-header/report-header.component';
import { AutocontrolDialogComponent } from './components/autocontrol/autocontrol-dialog/autocontrol-dialog.component';
import { DialogComponent } from './autocontrol/dialog/dialog.component';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';





@NgModule({
  declarations: [
    AppComponent,
    AutocontrolComponent,
    DashboardComponent,
    ReportComponent,
    ReportDataComponent,
    MachineErrorComponent,
    EfficiencyComponent,
    StatesGraphComponent,
    ReportHeaderComponent,
    AutocontrolDialogComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //  SdkServicesBaseModule.forRoot({
    //   "clientId":environment.clientId,
    //   "redirectUrl":environment.redirectUrl,
    //   "pitBaseUrl":environment.serverUrl,
    //   "scopes":"openid profile basecommon"}),
    SdkComponentsCommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    ButtonsModule,
    DialogModule,
    SdkComponentsGridModule,
    HttpClientModule,
    DropDownListModule,
    LabelModule,
    InputsModule,
    ProgressBarModule,
    ChartsModule,
    UploadsModule,
    DateInputsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: APP_BASE_HREF, useValue: '/lmsmodule/lmsservice'}
  //  { provide: DIALOG_SERVICE, useClass: DialogService },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
