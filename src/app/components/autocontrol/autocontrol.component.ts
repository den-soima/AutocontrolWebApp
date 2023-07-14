import { Component, OnInit } from '@angular/core';
import { AutocontrolCrudService } from '../../services/autocontrol.service';
import {
  IAutocontrol,
  IAutocontrolField,
} from 'src/app/interfaces/autocontrol.interface';
import {
  GridDataResult,
  AddEvent,
  RemoveEvent,
} from '@progress/kendo-angular-grid';
import { FilterableSettings } from '@progress/kendo-angular-grid';
@Component({
  selector: 'app-lines',
  templateUrl: './autocontrol.component.html',
  styleUrls: ['./autocontrol.component.scss'],
})
export class AutocontrolComponent implements OnInit {
  public autocontrolData: IAutocontrol[] = [];
  public mySelection: IAutocontrol[] = [];
  public isNew: boolean = false;
  public editItem: IAutocontrol | undefined;
  public nKeyAC: number = 0;
  public filterMode: FilterableSettings = "menu";

  /**
   *
   */
  constructor(public autocontrolService: AutocontrolCrudService) {}

  ngOnInit() {
    this.autocontrolService.getAutocontrols().subscribe((data) => {
      this.autocontrolData = data;
    });
  }

  public selectionChange(event: any): void {
    console.log('Grid - onStateChange');
    console.log(event);
    event.selectedRows[0].nACId = true;
    this.autocontrolData.find(
      (item) => item.nACId == event.selectedRows[0].nACId
    )?.enableButtons == true;
  }

  public addHandler() {
    this.isNew = true;
  }

  public editHandler(event: AddEvent) {
    this.editItem = event.dataItem;
    this.nKeyAC = this.editItem?.nACId!;
    this.isNew = false;
  }

  public cancelHandler() {
    this.nKeyAC = 0;
    this.editItem = undefined;
  }

  public saveHandler(fileds: IAutocontrolField[]) {
    // save service
    this.nKeyAC = 0;
    this.editItem = undefined;
  }

  public removeHandler(args: RemoveEvent) {
    // remove service
  }

  formatDate(value: any): string {
    return value
      ?.toString()
      .substring(0, 19)
      .replace('T', ' ')
      .replaceAll('-', '.');
  }
}
