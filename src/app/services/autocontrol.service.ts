import { Injectable } from '@angular/core';
import { IAutocontrol, IAutocontrolDialogField, IAutocontrolFieldEnum } from '../interfaces/autocontrol.interface';
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

  getAutocontrols(): Observable<any> {
    return this.http.get(`${this.baseURL}/autocontrol`) }

    getDialogFieldsByACId(nKeyAC: number): Observable<IAutocontrolDialogField[]> {
      return this.http.get<IAutocontrolDialogField[]>(
        `${this.baseURL}/autocontrol/fields/${nKeyAC}`
      );
    }

    getEnumsByFieldId(nACFId: number): Observable<IAutocontrolFieldEnum[]> {
      return this.http.get<IAutocontrolFieldEnum[]>(
        `${this.baseURL}/autocontrolfieldenum/${nACFId}`
      );
    }

    // UpdateAutocontrolField(nACFKey: number): Observable<ReportEfficiency[]> {
    //   return this.http.get<ReportEfficiency[]>(
    //     `${this.baseURL}/efficiency/${nACFKey}`
    //   );
    // }
}
