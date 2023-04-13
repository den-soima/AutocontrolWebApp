import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from "src/environments/environment";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SdkServicesBaseModule } from '@proleit/sdk-services-base';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SdkServicesBaseModule.forRoot({
      "clientId":environment.clientId,
      "redirectUrl":environment.redirectUrl,
      "pitBaseUrl":environment.serverUrl,
      "scopes":"openid profile basecommon"}) ],
  providers: [],
  bootstrap: [AppComponent]
,
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class AppModule { }
