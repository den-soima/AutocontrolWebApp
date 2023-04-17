import { Injectable } from '@angular/core';
import { dashboardData } from 'src/dashboardData';
import { DashboardData } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getData() : DashboardData []{


    return dashboardData;
  }
}
