import { Injectable } from '@angular/core';
import { autocontrolData } from 'src/autocontrolData';
import { AutocontrolData } from '../interfaces/autocontrol.interface';

@Injectable({
  providedIn: 'root',
})
export class AutocontrolCrudService {
  constructor() {}

  getAll(): AutocontrolData[] {
    return autocontrolData;
  }

  refreshList() {
    console.log('test rest Api');
  }
}
