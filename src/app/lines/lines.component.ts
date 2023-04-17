import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AutocontrolCrudService } from '../services/autocontrol-crud.service';
import { AutocontrolData } from 'src/app/interfaces/autocontrol.interface';

const createFormGroup = (autocontorolData: AutocontrolData) =>
  new FormGroup({
    nACId: new FormControl(autocontorolData.nACId),
    szLineName: new FormControl(autocontorolData.szLineName),
    szACName: new FormControl(autocontorolData.szACName),
    szArea: new FormControl(autocontorolData.szArea),
    nStatus: new FormControl(autocontorolData.nStatus),
    szComment: new FormControl(autocontorolData.szComment),
    tLastModified: new FormControl(autocontorolData.tLastModified),
  });

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss'],
})
export class LinesComponent {
  public autocontrolData: AutocontrolData[];
  public active: boolean = false;
  public isNew: boolean = false;
  public editedRowIndex: number = 0;
  public formGroup: FormGroup | any = null;

  /**
   *
   */
  constructor(public autocontrolService: AutocontrolCrudService) {
    this.autocontrolData = autocontrolService.getAll();
  }

  // public addHandler() {]
  //   this.formGroup = createFormGroup({
  //     nACId: 0,
  //     szLineName: '',
  //     szACName: '',
  //     szArea: '',
  //     nStatus: 0,
  //     szStatus: '',
  //     szComment: '',
  //     tLastModified: new Date()
  //   });
  //   this.isNew = true;
  //   this.active = true;
  // }

  public editHandler(event: any) {
    this.formGroup = createFormGroup(event.dataItem);
    this.isNew = false;
    this.active = true;
    this.editedRowIndex = event.rowIndex;
  }

  // public removeHandler({ dataItem }: any) {
  //   dataItem.forEach((dataItem: any) => {
  //     const index: number = this.sampleProducts.indexOf(dataItem);
  //     if (index !== -1) {
  //       const cloneProducts = this.sampleProducts;
  //       cloneProducts.splice(index, 1);
  //       this.sampleProducts = [];
  //       cloneProducts.forEach((product) => {
  //         this.sampleProducts.push(product);
  //       });
  //     }
  //   });
  // }

  onSave() {
    if (this.isNew === false) {
      const cloneProducts = this.autocontrolData;
      cloneProducts.splice(this.editedRowIndex, 1, this.formGroup.value);
      this.autocontrolData = [];
      cloneProducts.forEach((product) => {
        this.autocontrolData.push(product);
      });
    } else if (this.isNew === true) {
      const cloneProducts = this.autocontrolData;
      cloneProducts.push(this.formGroup.value);
      this.autocontrolData = [];
      cloneProducts.forEach((product) => {
        this.autocontrolData.push(product);
      });
    }

    this.active = false;
  }

  onCancel() {
    this.formGroup.reset();
    this.active = false;
  }
}
