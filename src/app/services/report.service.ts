import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportLine,ReportHeader } from '../interfaces/report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseURL = environment.apiUrl + '/autocontrol/api/v1/report';

  constructor(private http: HttpClient ) {

  }

  getLines(): Observable<ReportLine[]> {
    return this.http.get<ReportLine[]>(`${this.baseURL}/lines`)
  }

  getHeader(lineLink:number): Observable<ReportHeader>{
    return this.http.get<ReportHeader>(`${this.baseURL}/header/${lineLink}`)
  }
}
