import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  DashboardData,
  DashboardHeader,
} from '../../interfaces/dashboard.interface';
import { DashboardService } from '../../services/dashboard.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { RankImage } from '../../enums/rank-image.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public dashboardData: DashboardData[] = [];
  public dashboardHeader: DashboardHeader | undefined;
  public gaugeValue = 30;
  public reloadInterval: null | ReturnType<typeof setInterval> = null;

  constructor(
    private sanitizer: DomSanitizer,
    public dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.reloadInterval = setInterval(() => {
      this.loadData();
      console.log('Dashboard Interval');
    }, 30000);
  }

  ngOnDestroy(): void {
    if (this.reloadInterval) {
      clearInterval(this.reloadInterval);
      console.log('Interval destoyed' + this.reloadInterval);
    }
  }

  loadData() {
    this.dashboardService.getData().subscribe((data: DashboardData[]) => {
      this.dashboardData = data;
    });

    this.dashboardService.getHeader().subscribe((data: DashboardHeader[]) => {
      this.dashboardHeader = data[0];
    });
  }

  formatHeaderDate(value: any): string {
    return value
      ?.toString()
      .substring(0, 19)
      .replace('T', ' ')
      .replaceAll('-', '.');
  }

  formatHeaderDuration(value: any): string {
    return value?.toString().substring(11, 19);
  }

  formatThousand(value: any): string {
    return Number(value).toLocaleString('de');//.replace(',', '.');
  }

  levelCalculation(value: any) {
    var level = (Number(value) / 2100) * 100 + '%';
    return this.sanitizer.bypassSecurityTrustStyle(level);
  }

  formatTimeDuration(value: any) {
    return new Date(Number(value) * 1000).toISOString().substring(11, 19);
  }

  formatNumber(value: number) {
    return value >= 0 ? this.formatThousand((value)) : '';
  }
  formatInteger(value: number) {
    return value >= 0 ? this.formatThousand(Math.trunc(value)) : '';
  }

  waterRate(value: number) {
    return value > 0
      ? value.toFixed(2).toLocaleString().replace('.', ',') + ' hl/hl'
      : '';
  }
  shiftPercent(value: number) {
    return value.toFixed(0);
  }

  defineStatusText(value: any, statusOrder: number) {
    let record: DashboardData | undefined = this.dashboardData?.find(
      (x) => x.nDataXLinkLine == value
    );

    return statusOrder == 1
      ? record?.szCurrentMachineState
      : record?.szCurrentMachineState2;
  }

  defineStatusColor(value: any, statusOrder: number) {
    let record: DashboardData | undefined = this.dashboardData?.find(
      (x) => x.nDataXLinkLine == value
    );

    return statusOrder == 1
      ? record?.szColorCurrentMachineState
      : record?.szColorCurrentMachineState2;
  }

  defineRankImage(value: any) {
    let record: DashboardData | undefined = this.dashboardData?.find(
      (x) => x.nDataXLinkLine == value
    );

    if (record?.secProductionTime == 0) return RankImage.Durmiendo;
    if (record?.topPercent == 1) return RankImage.Aeropuerto;
    if (record?.nShiftPercent! < 40) return RankImage.Ambulancia;
    if (record?.nShiftPercent! > 5 + (record?.nObjEff!))
      return RankImage.Motocicleta;

    return RankImage.Bicicleta;
  }
}
