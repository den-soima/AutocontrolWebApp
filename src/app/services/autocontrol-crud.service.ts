import { Injectable } from '@angular/core';
import { autocontrolData } from 'src/autocontrolData';
import { IAutocontrol } from '../interfaces/autocontrol.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutocontrolCrudService {
  private baseURL = 'https://esbsjum54:54321/AutocontrolModule/AutocontrolService/api/v1'
  autocontrol: IAutocontrol[];
  constructor(private http: HttpClient ) {
    this.autocontrol = [];
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseURL}/Autocontrol`)
  }



  refreshList() {
    console.log('test rest Api');
  }
}
