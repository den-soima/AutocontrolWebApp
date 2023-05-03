import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import {
//   DIALOG_SERVICE,
//   SdkServicesBaseModule,
// } from '@proleit/sdk-services-base';
import { LinesComponent } from './lines/lines.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SdkComponentsCommonModule } from '@proleit/sdk-components-common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import '@progress/kendo-angular-intl/locales/en/all';
import { SdkComponentsGridModule } from '@proleit/sdk-components-grid';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule, DialogService } from '@progress/kendo-angular-dialog';
import { SdkComponentsValidationModule } from '@proleit/sdk-components-validation';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { SdkComponentsDateinputsModule } from '@proleit/sdk-components-dateinputs';
import { TestGridComponent } from './test-grid/test-grid.component';
import { ReportComponent } from './report/report.component';
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ReportDataComponent } from './report/report-data/report-data.component';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { MachineErrorComponent } from './report/report-data/machine-error/machine-error.component';





@NgModule({
  declarations: [
    AppComponent,
    LinesComponent,
    DashboardComponent,
    TestGridComponent,
    ReportComponent,
    ReportDataComponent,
    MachineErrorComponent,
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
    SdkComponentsValidationModule,
    SdkComponentsDateinputsModule,
    HttpClientModule,
    DropDownListModule,
    LabelModule,
    InputsModule,
    IndicatorsModule,
    ProgressBarModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' },
  //  { provide: DIALOG_SERVICE, useClass: DialogService },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
