import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ReportStatesGraph } from 'src/app/interfaces/report.interface';

@Component({
  selector: 'app-states-graph',
  templateUrl: './states-graph.component.html',
  styleUrls: ['./states-graph.component.scss'],
})
export class StatesGraphComponent implements OnInit, OnChanges {

machineName: string | undefined = 'default name 1';

  constructor() {}

  ngOnChanges(): void {
    this.machineName = this.data?.find((x) => x.sortOrder > 0)?.machine;

  }
  ngOnInit(): void {}

  @Input() data: ReportStatesGraph[] | undefined;
}
