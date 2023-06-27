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
      actualDate: this.data?.actualDate.toString() as string,
      lineName: this.data?.lineName as string,
      nFillerMachine: this.data?.nFillerMachine as number,
    };

  }

  ngOnInit(): void {

  }

  @Input() data: ReportHeader | undefined;

  formatDate(value: any){
    if (value !== undefined){
      return new Date(value.toString()).toLocaleString('es-ES').substring(0,9);

    }else{
      return '';
    }
  }

  formatThousand(value: any): string {
    return Number(value).toLocaleString('de');//.replace(',', '.');
  }

  formatNumber(value: number) {
    return value >= 0 ? this.formatThousand((value!)) : '';
  }

}
