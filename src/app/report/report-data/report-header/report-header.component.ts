import { Component, OnInit , Input, OnChanges} from '@angular/core';
import { ReportHeader } from 'src/app/interfaces/report.interface';

@Component({
  selector: 'app-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.scss']
})
export class ReportHeaderComponent implements OnInit {

  header = {
    actualTime: '',
    actualDate: '',
    lineName: '',
    nFillerMachine: 0,
  };
  constructor() { }

  ngOnChanges(): void {

    this.header = {
      actualTime: this.data?.actualTime.toString().substring(11,19) as string,
      actualDate: this.data?.actualDate.toString().substring(0,10).replace("-","/").replace("-","/") as string,
      lineName: this.data?.lineName as string,
      nFillerMachine: this.data?.nFillerMachine as number,
    };

  }

  ngOnInit(): void {

  }

  @Input() data: ReportHeader | undefined;

}
