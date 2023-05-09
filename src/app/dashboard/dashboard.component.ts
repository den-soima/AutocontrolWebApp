import { Component, OnInit } from '@angular/core';
import { DashboardData } from '../interfaces/dashboard.interface';
import { DashboardService } from '../services/dashboard.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Status } from '../enums/status.enum';
import { RankImage } from '../enums/rank-image.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public dashboardData: DashboardData[] = [];
  public gaugeValue = 30;
  public timeNow: string;

  constructor(
    private sanitizer: DomSanitizer,
    public dashboardService: DashboardService
  ) {

    this.timeNow = this.getDate();
  }

  ngOnInit(): void {
    this.loadData();
  }

  startTimer() {
    console.log('Start timer');
    setTimeout(() => {
      this.loadData();
    }, 30000);
  }

  loadData() {
    this.dashboardService.getData().subscribe((data: DashboardData[]) => {
      this.dashboardData = data;
      this.timeNow = this.getDate();
      this.startTimer();
    });
  }

  getDate():string{
    let date = new Date()
    return date.toLocaleDateString("es-ES") + ' ' + date.toLocaleTimeString("es-ES")
  }

  formatThousand(value: any): string {
    return Number(value).toLocaleString().replace(',', '.');
  }

  levelCalculation(value: any) {
    var level = (Number(value) / 2000) * 100 + '%';
    return this.sanitizer.bypassSecurityTrustStyle(level);
  }

  formatTimeDuration(value: any) {
    return new Date(Number(value) * 1000).toISOString().substring(11, 19);
  }

  formatNumber(value: number) {
    return value > 0 ? this.formatThousand(Math.trunc(value)) : '';
  }

  waterRate(value: number) {
    return value > 0
      ? value.toFixed(2).toLocaleString().replace('.', ',') + ' hl/hl'
      : '';
  }
  shiftPercent(value: number) {
    return value.toFixed(0);
  }

  defineStatusText(value: any,  statusOrder: number) {
    let record: DashboardData | undefined = this.dashboardData?.find(
      (x) => x.nDataXLinkLine == value
    );

    return statusOrder == 1? record?.szCurrentMachineState: record?.szCurrentMachineState2;
  }

  defineStatusColor(value: any, statusOrder: number) {
    let record: DashboardData | undefined = this.dashboardData?.find(
      (x) => x.nDataXLinkLine == value
    );

  return statusOrder == 1? record?.szColorCurrentMachineState: record?.szColorCurrentMachineState2;
  }

  defineRankImage(value: any) {
    let record: DashboardData | undefined = this.dashboardData?.find(
      (x) => x.nDataXLinkLine == value
    );

    if (record?.secProductionTime == 0) return RankImage.Durmiendo;
    if (record?.topPercent == 1) return RankImage.Aeropuerto;
    if (record?.nShiftPercent || 0 < 40) return RankImage.Ambulancia;
    if (record?.nShiftPercent || 0 > 5 + (record?.nObjEff || 0))
      return RankImage.Motocicleta;

    return RankImage.Bicicleta;
  }


}
