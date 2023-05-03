import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ReportLine,
  ReportHeader,
  ReportProductionInfo,
  ReportMachineError,
  ReportStatesGraph,
  ReportEfficiency,
  ReportErrorList,
} from '../interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseURL = environment.apiUrl + '/autocontrol/api/v1/report';

  constructor(private http: HttpClient) {}

  getLines(): Observable<ReportLine[]> {
    return this.http.get<ReportLine[]>(`${this.baseURL}/lines`);
  }

  getHeader(lineLink: number): Observable<ReportHeader[]> {
    return this.http.get<ReportHeader[]>(`${this.baseURL}/header/${lineLink}`);
  }

  getProductionInfo(lineLink: number): Observable<ReportProductionInfo[]> {
    return this.http.get<ReportProductionInfo[]>(
      `${this.baseURL}/productionInfo/${lineLink}`
    );
  }

  getMachineError(lineLink: number): Observable<ReportMachineError[]> {
    return this.http.get<ReportMachineError[]>(
      `${this.baseURL}/machineError/${lineLink}`
    );
  }

  getMachineErro2(lineLink: number): Observable<ReportMachineError[]> {
    return this.http.get<ReportMachineError[]>(
      `${this.baseURL}/machineError2/${lineLink}`
    );
  }

  getStatesGraph(lineLink: number): Observable<ReportStatesGraph[]> {
    return this.http.get<ReportStatesGraph[]>(
      `${this.baseURL}/statesGraph/${lineLink}`
    );
  }

  getEfficiency(lineLink: number): Observable<ReportEfficiency[]> {
    return this.http.get<ReportEfficiency[]>(
      `${this.baseURL}/efficiency/${lineLink}`
    );
  }

  getErrorList(lineLink: number): Observable<ReportErrorList[]> {
    return this.http.get<ReportErrorList[]>(
      `${this.baseURL}/errorList/${lineLink}`
    );
  }
}
