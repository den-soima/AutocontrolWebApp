import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ReportStatesGraph } from 'src/app/interfaces/report.interface';

@Component({
  selector: 'app-states-graph',
  templateUrl: './states-graph.component.html',
  styleUrls: ['./states-graph.component.scss'],
})
export class StatesGraphComponent implements OnInit, OnChanges {
  machineName: string | undefined = 'default name 1';

  chartData = [
    { nTime: 3800, colorCode: 'red' },
    { nTime: 1000, colorCode: 'green' },
    { nTime: 2000, colorCode: 'blue' },
    { nTime: 200, colorCode: 'yellow' },
    { nTime: 7000, colorCode: 'gray' },
  ];

  constructor() {}

  ngOnChanges(): void {
    this.machineName = this.data?.find((x) => x.sortOrder > 0)?.machine;
  }
  ngOnInit(): void {}

  @Input() data: ReportStatesGraph[] | undefined;

  formatThousand(value: any): string {
    return Number(value).toLocaleString('de');//.replace(',', '.');
  }

  formatNumber(value: number) {
    return value >= 0 ? this.formatThousand(value!) : '';
  }
}
