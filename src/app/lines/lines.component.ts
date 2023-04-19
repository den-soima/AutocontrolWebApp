import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AutocontrolCrudService } from '../services/autocontrol-crud.service';
import { IAutocontrol } from 'src/app/interfaces/autocontrol.interface';

const createFormGroup = (autocontorolItem: IAutocontrol) =>
  new FormGroup({
    nACId: new FormControl(autocontorolItem.nACId),
    szLineName: new FormControl(autocontorolItem.szLineName),
    szACName: new FormControl(autocontorolItem.szACName),
    szArea: new FormControl(autocontorolItem.szArea),
    // nStatus: new FormControl(autocontorolItem.nStatus),
    szStatus: new FormControl(autocontorolItem.szStatus),
    szComment: new FormControl(autocontorolItem.szComment),
    tLastModified: new FormControl(autocontorolItem.tLastModified),
  });

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss'],
})
export class LinesComponent implements OnInit {
  public autocontrolData: IAutocontrol[] = [];
  public isNew: boolean = false;
  public active = false;
  public editedRowIndex: number = 0;
  public formGroup: FormGroup | any = null;

  /**
   *
   */
  constructor(public autocontrolService: AutocontrolCrudService) {

  }

  ngOnInit() {
    this.autocontrolService.getAll().subscribe((data) => {
      this.autocontrolData = data;
    });
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

  public removeHandler({ dataItem }: any) {
    dataItem.forEach((dataItem: any) => {
      const index: number = this.autocontrolData.indexOf(dataItem);
      if (index !== -1) {
        const cloneProducts = this.autocontrolData;
        cloneProducts.splice(index, 1);
        this.autocontrolData = [];
        cloneProducts.forEach((autocontrolItem) => {
          this.autocontrolData.push(autocontrolItem);
        });
      }
    });
  }

  onSave() {
    const cloneProducts = this.autocontrolData;
    cloneProducts.splice(this.editedRowIndex, 1, this.formGroup.value);
    this.autocontrolData = [];
    cloneProducts.forEach((item) => {
      this.autocontrolData.push(item);
    });
    this.active = false;
  }

  onCancel() {
    this.formGroup.reset();
    this.active = false;
  }
}
