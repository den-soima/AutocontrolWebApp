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
import { ServiceDiscoveryService } from '@proleit/sdk-services-base';
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
  public serviceDiscovery: any;
  //public pitBaseUserId: string = "d860efca-22d9-47fd-8249-791ba61b07c7";
  public pitBaseUserId: string = "";

  /**
   *
   */
  constructor(public autocontrolService: AutocontrolCrudService, private sd: ServiceDiscoveryService) {

      this.serviceDiscovery  = sd;
      this.pitBaseUserId = this.serviceDiscovery.baseValueProvider.baseUserid._value;
  }

  ngOnInit() {
    this.autocontrolService.getAutocontrols().subscribe((data) => {
      this.autocontrolData = data;
    });
  }

  public selectionChange(event: any): void {
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
