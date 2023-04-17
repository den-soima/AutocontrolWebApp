import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DashboardData } from '../interfaces/dashboard.interface';
import { DashboardService } from '../services/dashboard.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Status } from '../enums/status.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public dashboardData: DashboardData[];
  public active: boolean = false;
  public isNew: boolean = false;
  public editedRowIndex: number = 0;
  public formGroup: FormGroup | any = null;

  /**
   *
   */
  constructor(
    private dashboardSerivice: DashboardService,
    private sanitizer: DomSanitizer
  ) {
    this.dashboardData = dashboardSerivice.getData();
  }

  refreshData() {}

  formatThousand(value: any): string {
    return Number(value).toLocaleString();
  }

  levelCalculation(value: any) {
    var level = (Number(value) / 1500) * 100 + '%';
    return this.sanitizer.bypassSecurityTrustStyle(level);
  }

  formatTimeDuration(value: any) {
    return new Date(Number(value) * 1000).toISOString().substring(11,19);
  }

  defineStatusText(value:any){
    // switch(Number(value)){
    //   case 1: return Status.Accumulation;
    //   case 2: return Status.Held;
    //   case 3: return Status.Service;
    //   case 4: return Status.SupplyLeak;
    //   default: return'';
    //}
    switch(Number(value)){
      case Status.Accumulation: return 'Accumulation';
      case Status.Held: return 'Held';
      case Status.Service: return 'Service';
      case Status.SupplyLeak: return 'Supply leak';
      default: return'';
    }
  }

  defineStatusColor(value:any){
    switch(Number(value)){
      case 2: return 'fuchsia';
      case 3: return 'yellow';
      case 1: return 'limegreen';
      case 4: return 'lightskyblue';
      default: return'';
    }
  }

  defineRankImage(value:any){
    switch(Number(value)){
      case 1: return './assets/Aircraft.png';
      case 2: return './assets/Ambulance.png';
      case 3: return './assets/Motorcycle.pngen';
      case 4: return './assets/Bicycle.png';
      default: return'';
    }
  }
}
