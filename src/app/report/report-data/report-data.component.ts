import { Component, OnChanges, OnInit, Input } from '@angular/core';
import {
  ReportData,
  ReportErrorList,
  ReportHeader,
} from 'src/app/interfaces/report.interface';

@Component({
  selector: 'app-report-data',
  templateUrl: './report-data.component.html',
  styleUrls: ['./report-data.component.scss'],
})
export class ReportDataComponent implements OnChanges, OnInit {
  errorList: ReportErrorList[] = [];
  header = {
    actualTime: '',
    actualDate: '',
    lineName: '',
    nFillerMachine: 0,
  };

  constructor() {}

  ngOnChanges(): void {
    console.log('report-data component - onChanges');

    this.errorList = this.reportData?.errorList as ReportErrorList[];
    this.header = {
      actualTime: this.reportData?.header?.actualTime.toString().substring(11,19) as string,
      actualDate: this.reportData?.header?.actualDate.toString().substring(0,10).replace("-","/").replace("-","/") as string,
      lineName: this.reportData?.header?.lineName as string,
      nFillerMachine: this.reportData?.header?.nFillerMachine as number,
    };
  }

  ngOnInit(): void {
    console.log('report-data component - onInit');
    // setTimeout(() => {
    //   this.ngOnInit();
    // }, 10000 * 10);
  }

  @Input() reportData: ReportData | undefined;
}
