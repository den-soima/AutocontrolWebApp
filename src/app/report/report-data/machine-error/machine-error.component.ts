import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ReportMachineError } from 'src/app/interfaces/report.interface';

@Component({
  selector: 'app-machine-error',
  templateUrl: './machine-error.component.html',
  styleUrls: ['./machine-error.component.scss'],
})
export class MachineErrorComponent implements OnInit, OnChanges {
  // machineError: ReportMachineError[] | undefined = [];
  constructor() {}

  ngOnChanges(): void {
    // if (this.data != null) this.machineError = this.data;
  }

  ngOnInit(): void {
    // for (let i = 0; i < 4; i++) {
    //   this.machineError?.push({
    //     szText: '',
    //     efficiency: 0,
    //     speed: 0,
    //     nError: 0,
    //     nSortOrder: 0,
    //     colorCode: '',
    //     fontColor: '',
    //   });
    // }
  }

  @Input() data: ReportMachineError[] | undefined;
}
