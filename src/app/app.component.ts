
import {
  Component,
  Inject,
  LOCALE_ID,
  HostListener,
  OnInit,
  ElementRef
} from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { AuthorizationService } from "@proleit/sdk-services-base";
import { ServiceDiscoveryService } from "@proleit/sdk-services-base";
import { ProcessMessage } from "@proleit/sdk-webframe";
import { Observable } from "rxjs";

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
  public frameRedirect = (uri: string, state: string) => {
    document.dispatchEvent(new CustomEvent('afterRedirect', { detail: state }));
  }



  title = "Autocontrol";

  public clientId: string;
  public pitBaseUrl: string;
  public redirectUrl: string;
  public logoutUrl: string;
  public stream: [] = [];
  public sinnloseProperty: any;

  public copyRightFooter = `\u00A9 Proleit, ${new Date().getFullYear()} All rights reserved`;

  /**
   */
  constructor(
    @Inject(LOCALE_ID)
    public locale : string,
    private router: Router,
    private authorization: AuthorizationService,
    private serviceDiscovery: ServiceDiscoveryService,
    private element: ElementRef,

    ) {
    this.clientId = environment.clientId;
    this.pitBaseUrl = environment.serverUrl;
    this.redirectUrl = environment.redirectUrl;
    this.logoutUrl = environment.logoutUrl;
    this.authorization.redirected.subscribe(x => this.router.navigate([x]));
  }

  ngOnInit(): void {
    this.element.nativeElement.dispatchEvent(new CustomEvent('loadingProcess', {
      detail: {
        promise: new Promise<ProcessMessage>((resolve, reject) => {
          resolve({ message: 'Connection successfully established' }),
          reject({ message: 'Connection failed to be established', error: true, continue: false })
        }),
        processMessage: {
          message: 'Establishing connection...',
          weight: 10
        }
      },
      bubbles: true
    }));
    this.element.nativeElement.dispatchEvent(new CustomEvent('loadingProcess', {
      detail:   {
        observable: new Observable<ProcessMessage>(subscriber => {
          subscriber.next({ message: 'Connection successfully established' }),
          subscriber.complete();
        }),
        processMessage: {
          message: 'Establishing connection...',
          weight: 5
        }
      },
      bubbles: true
    }));
    this.element.nativeElement.dispatchEvent(new CustomEvent('loadingProcess', {
      detail:  {
        observable: new Observable<ProcessMessage>(subscriber => {
          setTimeout( () => {
            subscriber.error({ message: 'Logo could not be loaded', error: true, continue: true}),
            subscriber.complete();
          }, 500);
        }),
        processMessage: {
          message: 'Loading Logo...',
          weight: 3
        }
      },
      bubbles: true
    }));
  }

}
