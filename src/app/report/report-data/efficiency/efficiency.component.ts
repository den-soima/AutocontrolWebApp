import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ReportEfficiency } from 'src/app/interfaces/report.interface';

@Component({
  selector: 'app-efficiency',
  templateUrl: './efficiency.component.html',
  styleUrls: ['./efficiency.component.scss'],
})
export class EfficiencyComponent implements OnInit, OnChanges {
  categories: string[] = [];
  seriesEff: number[] = [];
  seriesEffAcumulado: number[] = [];

  constructor() {}

  ngOnChanges(): void {
    this.categories = [];
    this.seriesEff = [];
    this.seriesEffAcumulado = [];

    this.data?.forEach((x) => {
      this.categories.push(x.hoursAgo.toString());
      this.seriesEff.push(x.percEff*100);
      this.seriesEffAcumulado.push(x.percEffAcumulado*100);
    });


  }

  ngOnInit(): void {}

  @Input() data: ReportEfficiency[] | undefined;
}
