import { Component } from '@angular/core';
import { sampleProducts } from 'src/dummyData';
import { FormGroup, FormControl } from '@angular/forms';

interface DataItem {
  ProductID: string;
  ProductName: string;
  CategoryName: string;
  UnitPrice: number;
  UnitsInStock: number;
  Discontinued: boolean;
}

const createFormGroup = (dataItem: DataItem) =>
  new FormGroup({
    ProductID: new FormControl(dataItem.ProductID),
    ProductName: new FormControl(dataItem.ProductName),
    CategoryName: new FormControl(dataItem.CategoryName),
    UnitPrice: new FormControl(dataItem.UnitPrice),
    UnitsInStock: new FormControl(dataItem.UnitsInStock),
    Discontinued: new FormControl(dataItem.Discontinued),
  });

@Component({
  selector: 'app-test-grid',
  templateUrl: './test-grid.component.html',
  styleUrls: ['./test-grid.component.scss']
})
export class TestGridComponent {
  public sampleProducts: any[] = sampleProducts;
  public formGroup: FormGroup | any = null;
  private editedRowIndex: number = -1;

  constructor() { }

  public addHandler({ sender }:any) {
    this.closeEditor(sender);
    this.formGroup = createFormGroup({
      ProductID: '',
      ProductName: '',
      CategoryName: '',
      UnitPrice: 0,
      UnitsInStock: 0,
      Discontinued: false,
    });
    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }: any) {
    this.closeEditor(sender);
    this.formGroup = createFormGroup(dataItem);
    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }

  public removeHandler({ dataItem } :any) {
    dataItem.forEach(({dataItem}: any) => {
      const index: number = this.sampleProducts.indexOf(dataItem);
      if (index !== -1) {
        const cloneProducts = this.sampleProducts;
        cloneProducts.splice(index, 1);
        this.sampleProducts = [];
        cloneProducts.forEach(product => {
          this.sampleProducts.push(product);
        });
      }
    });
  }

  public saveHandler({ sender, isNew }: any) {
    if (isNew === false) {
      const cloneProducts = this.sampleProducts;
      cloneProducts.splice(this.editedRowIndex, 1, this.formGroup.value);
      this.sampleProducts = [];
      cloneProducts.forEach(product => {
        this.sampleProducts.push(product);
      });
    } else if (isNew === true) {

    }
    this.closeEditor(sender);
  }

  private closeEditor(grid : any, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = -1;
    this.formGroup = undefined;
  }

}




