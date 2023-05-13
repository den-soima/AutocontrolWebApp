import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardData, DashboardHeader } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseURL = environment.apiUrl + '/dashboard';

  constructor(private http: HttpClient) {}

  getData(): Observable<DashboardData[]> {
    return this.http.get<DashboardData[]>(`${this.baseURL}/data`);

  }

  getHeader(): Observable<DashboardHeader[]> {
    return this.http.get<DashboardHeader[]>(`${this.baseURL}/header`);

  }
}
