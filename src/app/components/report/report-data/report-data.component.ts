import { Component, OnChanges, OnInit, Input } from '@angular/core';
import {
  ReportData,
  ReportErrorList,
  ReportHeader,
  ReportStatesGraph,
} from 'src/app/interfaces/report.interface';

@Component({
  selector: 'app-report-data',
  templateUrl: './report-data.component.html',
  styleUrls: ['./report-data.component.scss'],
})
export class ReportDataComponent implements OnChanges, OnInit {

  @Input() reportData: ReportData | undefined;

  errorList: ReportErrorList[] = [];


  statesGraphData1:ReportStatesGraph[] | undefined;
  statesGraphData2:ReportStatesGraph[] | undefined;

  constructor() {}

  ngOnChanges(): void {

    this.errorList = this.reportData?.errorList as ReportErrorList[];

    let sortOrder = this.reportData?.statesGraph?.find((x) => x.sortOrder > 0)?.sortOrder || 0;

    if (sortOrder > 0) {
      this.statesGraphData1 = this.reportData?.statesGraph?.filter(
        (x) => x.sortOrder === sortOrder
      );

      this.statesGraphData2 = this.reportData?.statesGraph?.filter(
        (x) => x.sortOrder !== sortOrder
      );
    }
  }

  ngOnInit(): void {

  }

  formatThousand(value: any): string {
    return Number(value).toLocaleString('de');//.replace(',', '.');
  }

  formatNumber(value: number) {
    return value >= 0 ? this.formatThousand((value!)) : '';//Math.trunc
  }

  formatInteger(value: number) {
    return value >= 0 ? this.formatThousand(Math.trunc(value!)) : '';//Math.trunc
  }

}
