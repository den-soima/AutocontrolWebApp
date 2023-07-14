import { Injectable } from '@angular/core';
import {
  IAutocontrol,
  IAutocontrolDialogField,
  IAutocontrolField,
  IAutocontrolFieldEnum,
} from '../interfaces/autocontrol.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutocontrolCrudService {
  private baseURL = environment.apiUrl;
  public uploadFileURL: string = environment.apiUrl + '/autocontrol/field/file';
  public deleteFileURL: string = '';
  autocontrol: IAutocontrol[];
  constructor(private http: HttpClient) {
    this.autocontrol = [];
  }

  getAutocontrols(): Observable<any> {
    return this.http.get(`${this.baseURL}/autocontrol`);
  }

  getDialogFieldsByACId(nKeyAC: number): Observable<IAutocontrolDialogField[]> {
    return this.http.get<IAutocontrolDialogField[]>(
      `${this.baseURL}/autocontrol/fields/${nKeyAC}`
    );
  }

  getEnumsByFieldId(nACFId: number): Observable<IAutocontrolFieldEnum[]> {
    return this.http.get<IAutocontrolFieldEnum[]>(
      `${this.baseURL}/autocontrol/fieldenum/${nACFId}`
    );
  }

  postFile(nACFId: number, file: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    console.log(formData.get(file.name));
    return this.http
      .post<boolean>(`${this.baseURL}/autocontrol/field/file/${nACFId}`, formData);
}


  updateAutocontrolField(field:IAutocontrolField): Observable<IAutocontrolField[]> {
    return this.http.put<IAutocontrolField[]>(
      `${this.baseURL}/autocontrol/field`,
      field
    );
  }
}
