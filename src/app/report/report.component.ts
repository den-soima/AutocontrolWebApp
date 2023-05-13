import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportService } from '../services/report.service';
import {
  ReportData,
  ReportLine,
  ReportHeader,
  ReportProductionInfo,
  ReportMachineError,
  ReportStatesGraph,
  ReportEfficiency,
  ReportErrorList,
  ReporDataLoadingStatus,
} from '../interfaces/report.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ReportService],
})
export class ReportComponent implements OnInit, OnDestroy {
  reportLines: ReportLine[] = [];
  selectedLine: ReportLine = { lineLink: -1, lineName: '' };
  selectedLineByUrl: ReportLine | undefined;
  loadButtonEnable: boolean = false;
  linesLoaded: boolean = false;
  buttonText: string = 'Load data';
  reporDataLoadingStatus: ReporDataLoadingStatus = {
    header: false,
    productionInfo: false,
    machineError: false,
    machineError2: false,
    statesGraph: false,
    efficiency: false,
    errorList: false,
    dataLoaded: false,
    loadProgress: 0,
  };

  // Report data
  reportData: ReportData | undefined;
  reportHeader: ReportHeader | undefined;
  reportProductionInfo: ReportProductionInfo | undefined;
  reportMachineError: ReportMachineError[] | undefined;
  reportMachineError2: ReportMachineError[] | undefined;
  reportStatesGraph: ReportStatesGraph[] | undefined;
  reportEfficiency: ReportEfficiency[] | undefined;
  reportErrorList: ReportErrorList[] | undefined;
  public reloadInterval: null | ReturnType<typeof setInterval> = null;

  // route
  routeId: string | null = '';

  constructor(public reportService: ReportService, private route: ActivatedRoute) {}

  ngOnInit() {

    this.routeId = this.route.snapshot.paramMap.get('id');
    this.reportService.getLines().subscribe((data: ReportLine[]) => {
      this.reportLines = data;
      this.selectedLineByUrl = this.reportLines.find(x=>x.lineName==this.routeId);
      if (this.selectedLineByUrl !== undefined) this.valueChange(this.selectedLineByUrl);
      this.linesLoaded = data.length > 1;
    });

    this.reloadInterval = setInterval(() => {
      this.loadData();
      console.log("Report Interval");
    }, 60000);
  }

  ngOnDestroy(): void {
    if (this.reloadInterval){
      clearInterval(this.reloadInterval)
    console.log("Interval destoyed" + this.reloadInterval);
    };
  }
  public valueChange(value: ReportLine): void {
    this.selectedLine = value;
    this.reporDataLoadingStatus.dataLoaded = false;
    this.loadButtonEnable = value.lineLink > 0;

    if (this.selectedLineByUrl !== undefined) this.loadData();
  }

  loadData() {
    this.reporDataLoadingStatus.loadProgress = 0;
    this.loadHeader(this.selectedLine.lineLink);
    this.loadProductionInfo(this.selectedLine.lineLink);
    this.loadMachineError(this.selectedLine.lineLink);
    this.loadMachineError2(this.selectedLine.lineLink);
    this.loadStatesGraph(this.selectedLine.lineLink);
    this.loadEfficiency(this.selectedLine.lineLink);
    this.loadErroList(this.selectedLine.lineLink);

    this.buttonText = 'Loading';
    this.loadButtonEnable = false;
  }

  loadHeader(lineLink: number) {
    this.reportService.getHeader(lineLink).subscribe(
      (data: ReportHeader[]) => {
        this.reportHeader = data[0];
        this.dataLoaderChecker('header');
      },
      (error) => {
        console.log(error);
        this.dataLoaderChecker('header');
      }
    );
  }

  loadProductionInfo(lineLink: number) {
    this.reportService.getProductionInfo(lineLink).subscribe(
      (data: ReportProductionInfo[]) => {
        this.reportProductionInfo = data[0];
        this.dataLoaderChecker('productionInfo');
      },
      (error) => {
        console.log(error);
        this.dataLoaderChecker('productionInfo');
      }
    );
  }

  loadMachineError(lineLink: number) {
    this.reportService.getMachineError(lineLink).subscribe(
      (data: ReportMachineError[]) => {
        this.reportMachineError = data;
        this.dataLoaderChecker('machineError');
      },
      (error) => {
        console.log(error);
        this.dataLoaderChecker('machineError');
      }
    );
  }

  loadMachineError2(lineLink: number) {
    this.reportService.getMachineErro2(lineLink).subscribe(
      (data: ReportMachineError[]) => {
        this.reportMachineError2 = data;
        this.dataLoaderChecker('machineError2');
      },
      (error) => {
        console.log(error);
        this.dataLoaderChecker('machineError2');
      }
    );
  }

  loadStatesGraph(lineLink: number) {
    this.reportService.getStatesGraph(lineLink).subscribe(
      (data: ReportStatesGraph[]) => {
        this.reportStatesGraph = data;
        this.dataLoaderChecker('statesGraph');
      },
      (error) => {
        console.log(error);
        this.dataLoaderChecker('statesGraph');
      }
    );
  }

  loadEfficiency(lineLink: number) {
    this.reportService.getEfficiency(lineLink).subscribe(
      (data: ReportEfficiency[]) => {
        this.reportEfficiency = data;
        this.dataLoaderChecker('efficiency');
      },
      (error) => {
        console.log(error);
        this.dataLoaderChecker('efficiency');
      }
    );
  }

  loadErroList(lineLink: number) {
    this.reportService.getErrorList(lineLink).subscribe(
      (data: ReportErrorList[]) => {
        this.reportErrorList = data;
        this.dataLoaderChecker('errorList');
      },
      (error) => {
        console.log(error);
        this.dataLoaderChecker('errorList');
      }
    );
  }

  dataLoaderChecker(property: string) {
    (this.reporDataLoadingStatus as any)[property] = true;

    this.reporDataLoadingStatus.loadProgress += 1;

    if (this.reporDataLoadingStatus.loadProgress == 7) this.assignReportData();
  }

  assignReportData() {
    this.reportData = {
      header: this.reportHeader,
      productionInfo: this.reportProductionInfo,
      machineError: this.reportMachineError,
      machineError2: this.reportMachineError2,
      statesGraph: this.reportStatesGraph,
      efficiency: this.reportEfficiency,
      errorList: this.reportErrorList,
    };

    this.reporDataLoadingStatus.dataLoaded = true;
    this.buttonText = 'Reload data';
    this.loadButtonEnable = true;
  }
}
