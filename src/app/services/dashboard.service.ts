import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardData } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getData(): Observable<DashboardData[]> {
    return this.http.get<DashboardData[]>(`${this.baseURL}/dashboard`);
  }
}
