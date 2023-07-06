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
  IAutocontrolFieldEnum,
} from 'src/app/interfaces/autocontrol.interface';
import { AutocontrolCrudService } from 'src/app/services/autocontrol.service';
import { FieldType } from 'src/app/enums/autocontro-fields.enum';
import { switchMap, tap } from 'rxjs';
import { FileRestrictions } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-autocontrol-dialog',
  templateUrl: './autocontrol-dialog.component.html',
  styleUrls: ['./autocontrol-dialog.component.scss'],
})
export class AutocontrolDialogComponent implements OnInit, OnChanges {
  public dialogFields: IAutocontrolDialogField[] = [];
  public fieldEnums: IAutocontrolFieldEnum[] = [];
  public formGroup: FormGroup = new FormGroup({});
  public active = false;
  public uploadFileUrl: string = '';
  public removeFileUrl: string = '';
  public uploadImageRestrictions: FileRestrictions = {
    allowedExtensions: ['jpg', 'jpeg', 'png'],
  };

  public value: Date = new Date(2019, 5, 1, 22);
  public format = 'MM/dd/yyyy HH:mm';

  public myFiles: Array<any> = [];
  public submitted = false;

  public get fieldType(): typeof FieldType {
    return FieldType;
  }

  constructor(
    public autocontrolService: AutocontrolCrudService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({});
  }

  @Input() public nKeyAC: number = 0;
  @Input() public isNew: boolean = false;
  @Output() cancel: EventEmitter<undefined> = new EventEmitter();
  @Output() save: EventEmitter<IAutocontrolField[]> = new EventEmitter();

  ngOnInit(): void {
    console.log('OnInit');
    // if (this.nKeyAC)
    //   this.autocontrolService
    //     .getDialogFieldsByACId(this.nKeyAC)
    //     .subscribe((data) => {
    //       this.dialogFileds = data;
    //       this.createFormFields(this.dialogFileds);
    //     });
  }

  ngOnChanges(): void {
    console.log('ngOnChnages');
    this.formGroup = new FormGroup({});

    this.active = this.nKeyAC > 0;
    if (this.nKeyAC)
      this.autocontrolService
        .getDialogFieldsByACId(this.nKeyAC)
        // .pipe(
        //   tap((fields) => console.log(fields)),
        //   switchMap((fields) => {

        //     fields.forEach(item =>{
        //       this.autocontrolService.getEnumsByFieldId(item.nACFId)
        //     });

        //     this.fieldEnums = data;
        //   })
        // )
        .subscribe((data) => {
          this.dialogFields = data;

          // this.dialogFileds.forEach((item, index) => {
          //   if(item.nFieldDataType == FieldType.Enum){
          //     this.autocontrolService.getEnumsByFieldId(item.nACFId).subscribe((data) =>{
          //       this.dialogFileds[index].enumData = data;
          //     });
          //   }
          // });

          this.createFormGroup();
        });
  }

  createFormGroup() {
    this.handleEnumDataType();
    this.handleFilesUploadDataType();

    this.dialogFields.forEach((item, index) => {
      this.dialogFields[index].typedValue = this.typeValue(
        item.nACFId,
        item.nFieldDataType,
        item.szValue
      );

      this.formGroup.addControl(
        item.szACFieldName,
        // this.formBuilder.control(item.typedValue, Validators.required)
        new FormControl(item.typedValue, Validators.required)
      );
    });

    // this.formGroup = this.fb.group({
    //   files: [this.myFiles, [Validators.required]],
    // });

    console.log(this.formGroup);
  }

  handleEnumDataType() {
    this.dialogFields.forEach((item, index) => {
      if (item.nFieldDataType == FieldType.Enum) {
        this.autocontrolService
          .getEnumsByFieldId(item.nACFId)
          .subscribe((data) => {
            this.dialogFields[index].enumData = data;
            this.dialogFields[index].typedValue = this.dialogFields[
              index
            ].enumData.find((en) => en.nEnumValue == parseInt(item.szValue));
          });
      }
    });
  }

  handleFilesUploadDataType(){
    this.dialogFields.forEach((item, index) => {
      if (item.nFieldDataType == FieldType.File) {
        this.autocontrolService
          .getEnumsByFieldId(item.nACFId)
          .subscribe((data) => {
            this.dialogFields[index].enumData = data;
            this.dialogFields[index].typedValue = this.dialogFields[
              index
            ].enumData.find((en) => en.nEnumValue == parseInt(item.szValue));
          });
      }
    });
  }

  typeValue(nACFId: number, type: number, value: string): any {
    switch (type) {
      case FieldType.Integer:
        return parseInt(value) ? parseInt(value) : 0;
        break;
      case FieldType.String:
        return value;
        break;
      case FieldType.Float:
        return parseFloat(value) ? parseFloat(value) : 0;
        break;
      case FieldType.Enum:
        break;
      case FieldType.File:
        return value;
        break;
      case FieldType.Date:
        return Date.parse(value) ? Date.parse(value) : new Date();
        break;
      case FieldType.Time:
        return Date.parse(value) ? Date.parse(value) : new Date();
        break;
      case FieldType.DateTime:
        return Date.parse(value) ? Date.parse(value) : new Date();
        break;
      default:
        return value;
    }
  }

  onSave(e:MouseEvent) {
    console.log('onSave');

    e.preventDefault();
    // const cloneProducts = this.autocontrolData;
    // cloneProducts.splice(this.editedRowIndex, 1, this.formGroup.value);
    // this.autocontrolData = [];
    // cloneProducts.forEach((item) => {
    //   this.autocontrolData.push(item);
    // });
    this.submitted = true;


    // if (true) {
    //     const formData = new FormData();
    //     value.avatar.forEach(file => {
    //         formData.append('files', file);
    //     });

    //     this.http.post(`api/Submit`, formData).subscribe(() => {
    //         console.log('Everything is OK!');
    //     }),
    //         err => {
    //             console.log(err);
    //         };
    // }

    console.log(this.formGroup.value);
    this.save.emit(this.formGroup.value);
    this.closeForm();
  }

  onCancel(e: MouseEvent) {
    e.preventDefault();
    this.cancel.emit();
    this.closeForm();
  }

  closeForm(): void {
    this.formGroup.reset();
    this.active = false;
  }
}
