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
  seriesColors: string[] = ['#FF6666', '#3399FF'];

  constructor() {}

  ngOnChanges(): void {
    this.categories = [];
    this.seriesEff = [];
    this.seriesEffAcumulado = [];


    this.data?.sort((a,b)=> b.hourRecorded - a.hourRecorded).forEach((x) => {
      console.log(x);
      this.categories.push(x.hourRecorded.toString());
      this.seriesEff.push(Math.round(x.percEff*100));
      this.seriesEffAcumulado.push(Math.round(x.percEffAcumulado*100));
    });


  }

  ngOnInit(): void {}

  @Input() data: ReportEfficiency[] | undefined;
}
