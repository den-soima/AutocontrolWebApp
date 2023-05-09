import { Injectable } from '@angular/core';
import { IAutocontrol } from '../interfaces/autocontrol.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutocontrolCrudService {
  private baseURL = environment.apiUrl;
  autocontrol: IAutocontrol[];
  constructor(private http: HttpClient ) {
    this.autocontrol = [];
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseURL}/autocontrol`) }

}
