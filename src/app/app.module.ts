import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { SdkServicesBaseModule } from '@proleit/sdk-services-base';
import { LinesComponent } from './lines/lines.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SdkComponentsCommonModule } from '@proleit/sdk-components-common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import '@progress/kendo-angular-intl/locales/en/all';
import { SdkComponentsGridModule } from '@proleit/sdk-components-grid';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { SdkComponentsValidationModule } from '@proleit/sdk-components-validation';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import {SdkComponentsDateinputsModule} from '@proleit/sdk-components-dateinputs';

@NgModule({
  declarations: [AppComponent, LinesComponent, DashboardComponent],
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
		SdkComponentsDateinputsModule
],
  providers: [{ provide: LOCALE_ID, useValue: 'en' } ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
