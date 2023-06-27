import {
  Component,
  Input,
  OnInit,
  Output,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  Form,
} from '@angular/forms';
import {
  IAutocontrolDialogField,
  IAutocontrolField,
} from 'src/app/interfaces/autocontrol.interface';
import { AutocontrolCrudService } from 'src/app/services/autocontrol.service';
import { FieldType } from 'src/app/enums/autocontro-fields.enum';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-autocontrol-dialog',
  templateUrl: './autocontrol-dialog.component.html',
  styleUrls: ['./autocontrol-dialog.component.scss'],
})
export class AutocontrolDialogComponent implements OnInit, OnChanges {
  public dialogFileds: IAutocontrolDialogField[] = [];
  public formGroup: FormGroup | any = null;
  public active = false;

  public get fieldType(): typeof FieldType {
    return FieldType;
  }

  constructor(
    public autocontrolService: AutocontrolCrudService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({});
  }

  @Input() public nKeyAC: number = 0;
  @Input() public isNew: boolean = false;
  @Output() cancel: EventEmitter<undefined> = new EventEmitter();
  @Output() save: EventEmitter<IAutocontrolField[]> = new EventEmitter();

  ngOnInit(): void {
    // if (this.nKeyAC)
    //   this.autocontrolService
    //     .getDialogFieldsByACId(this.nKeyAC)
    //     .subscribe((data) => {
    //       this.dialogFileds = data;
    //       this.createFormFields(this.dialogFileds);
    //     });
  }

  ngOnChanges(): void {
    this.active = this.nKeyAC > 0;
    if (this.nKeyAC)
      this.autocontrolService
        .getDialogFieldsByACId(this.nKeyAC)
        .pipe(
          tap(data => console.log(date) );
          switchMap()
        )
        .subscribe((data) => {
          this.dialogFileds = data;

          // this.dialogFileds.forEach((item, index) => {
          //   if(item.nFieldDataType == FieldType.Enum){
          //     this.autocontrolService.getEnumsByFieldId(item.nACFId).subscribe((data) =>{
          //       this.dialogFileds[index].enumData = data;
          //     });
          //   }
          // });

          this.createFormGroup(this.dialogFileds);
        });
  }

  createFormGroup(formFileds: IAutocontrolDialogField[]) {
    formFileds.forEach((item, index) => {
      formFileds[index].typedValue = this.typeValue(
        item.nFieldDataType,
        item.szValue
      );
      const controlName = item.szACFieldName;
      this.formGroup.addControl(
        controlName,
        this.formBuilder.control(item.typedValue, Validators.required)
      );
    });
  }

  typeValue(type: number, value: string): any {
    switch (type) {
      case FieldType.Integer:
        return parseInt(value);
        break;
      case FieldType.String:
        return value;
        break;
      case FieldType.Float:
        return parseFloat(value);
        break;
      case FieldType.Enum:
        return parseInt(value);
        break;
      case FieldType.File:
        return value;
        break;
      case FieldType.Date:
        return Date.parse(value);
        break;
      case FieldType.Time:
        return Date.parse(value);
        break;
      case FieldType.DateTime:
        return Date.parse(value);
        break;
      default:
        return value;
    }
  }

  onSave(e: MouseEvent) {
    e.preventDefault();
    // const cloneProducts = this.autocontrolData;
    // cloneProducts.splice(this.editedRowIndex, 1, this.formGroup.value);
    // this.autocontrolData = [];
    // cloneProducts.forEach((item) => {
    //   this.autocontrolData.push(item);
    // });
    this.save.emit(this.formGroup.value);
    this.active = false;
  }

  onCancel(e: MouseEvent) {
    e.preventDefault();
    this.closeForm();
  }

  closeForm(): void {
    //this.formGroup.reset();
    this.active = false;
    this.cancel.emit();
  }
}
