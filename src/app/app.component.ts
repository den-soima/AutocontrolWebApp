
import {
  Component,
  Inject,
  LOCALE_ID,
  HostListener,
  OnInit,
} from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { RestCrudServices } from "./services/rest-crud.service";
import { AuthorizationService } from "@proleit/sdk-services-base";
import { ServiceDiscoveryService } from "@proleit/sdk-services-base";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  @HostListener("document:afterRedirect", ["$event"])
  afterRedirect(event: CustomEvent) {
    this.router.navigate([event.detail]);
  }

  public frameRedirect = (uri: string, state: string) => {
    document.dispatchEvent(new CustomEvent('afterRedirect', { detail: state }));
  }

  // public listen({ detail }: CustomEvent): void {
  //   const url = detail.split("?");
  //   if (url.length > 1) {
  //     const params: any = {};
  //     url[1].split("&").forEach((x: any) => {
  //       const a = x.split("=");
  //       params[a[0]] = a[1];
  //     });
  //     this.router.navigate([url[0]], { queryParams: params });
  //   } else {
  //     this.router.navigate([detail]);
  //   }
  // }
  title = "Autocontrol";

  public clientId: string;
  public pitBaseUrl: string;
  public redirectUrl: string;
  public logoutUrl: string;
  public stream: [] = [];
  public sinnloseProperty: any;

  public copyRightFooter = `\u00A9 Proleit GmBH, ${new Date().getFullYear()} All rights reserved`;

  /**
   */
  constructor(
    @Inject(LOCALE_ID)
    public locale : string,
    private router: Router,
    public rcservices: RestCrudServices,
    private authorization: AuthorizationService,
    serviceDiscovery: ServiceDiscoveryService
    ) {
    this.clientId = environment.clientId;
    this.pitBaseUrl = environment.serverUrl;
    this.redirectUrl = environment.redirectUrl;
    this.logoutUrl = environment.logoutUrl;
    this.authorization.redirected.subscribe(x => this.router.navigate([x]));
  }

  ngOnInit(): void {
    this.rcservices.refreshList();
  }

}
