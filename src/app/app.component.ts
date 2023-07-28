import {
  Component,
  Inject,
  LOCALE_ID,
  HostListener,
  OnInit,
  ElementRef,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthorizationService , ServiceDiscoveryService } from '@proleit/sdk-services-base';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostListener('document:afterRedirect', ['$event'])
  @HostListener('document:userProfileReady', ['$event'])
  afterRedirect(event: CustomEvent) {
    this.router.navigate([event.detail]);
  }

  public frameRedirect = (uri: string, state: string) => {
    document.dispatchEvent(new CustomEvent('afterRedirect', { detail: state }));
  };

  title = 'Autocontrol';

  public clientId: string;
  public pitBaseUrl: string;
  public redirectUrl: string;
  public logoutUrl: string;
  public stream: [] = [];
  public sinnloseProperty: any;
  public hidemenu: boolean = false;

  public copyRightFooter = `\u00A9 Proleit, ${new Date().getFullYear()} All rights reserved`;

  /**
   */
  constructor(
    @Inject(LOCALE_ID)
    public locale: string,
    private router: Router,
    private authorization: AuthorizationService,
    private serviceDiscovery: ServiceDiscoveryService,
    private element: ElementRef
  ) {
    this.clientId = environment.clientId;
    this.pitBaseUrl = environment.serverUrl;
    this.redirectUrl = environment.redirectUrl;
    this.logoutUrl = environment.logoutUrl;

    // authorization.redirected.subscribe((x: any) => {
    //   const parameterIndex = x.indexOf('?');
    //   if (parameterIndex > -1) {
    //     const route = x.slice(0, parameterIndex);
    //     const params = x.slice(parameterIndex + 1).split('&');
    //     const paramObject: any = new Object();
    //     params.forEach((param: any) => {
    //       const paramElements = param.split('=');
    //       paramObject[paramElements[0]] = paramElements[1];
    //     });
    //     this.router.navigate([route], { queryParams: paramObject });
    //   } else {
    //     this.router.navigate([x]);
    //   }
    // });

    this.authorization.redirected.subscribe(x => {
      console.log(x);
      this.router.navigate([x])})
    serviceDiscovery.getAllServicesFromModule("UserMgmt").then(serviceInfo =>{
      console.log(serviceInfo);
    });


  }

  ngOnInit(): void {}
}
