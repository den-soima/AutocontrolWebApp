import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { ReportHeader, ReportLine } from '../interfaces/report.interface';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ReportService]
})
export class ReportComponent implements OnInit {
public reportLines: ReportLine [] = [];
selectedLine: ReportLine = {lineLink : -1, lineName :''};

public reportHeader = {} ;


 constructor(public reportService: ReportService) {

  }

  ngOnInit() {
    this.reportService.getLines().subscribe((data: ReportLine[]) => {
      this.reportLines = data;
    });
  }

  public valueChange(value: ReportLine): void{
  this.selectedLine = value;
  this.reloadData(this.selectedLine);

  }

  reloadData(line: ReportLine){
    this.reloadHeader(line.lineLink);
  }

  reloadHeader(lineLink: number){
    this.reportService.getHeader(lineLink).subscribe((data: ReportHeader) => {
      this.reportHeader = data;
    });
  }

}
