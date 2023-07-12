import {
  Component,
  Input,
  OnInit,
  Output,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import {
  IAutocontrolDialogField,
  IAutocontrolField,
  IAutocontrolFieldEnum,
} from 'src/app/interfaces/autocontrol.interface';
import { AutocontrolCrudService } from 'src/app/services/autocontrol.service';
import { FieldType } from 'src/app/enums/autocontro-fields.enum';
import { FileRestrictions, FileInfo } from '@progress/kendo-angular-upload';
import { FileSelectComponent, FileState } from '@progress/kendo-angular-upload';
@Component({
  selector: 'app-autocontrol-dialog',
  templateUrl: './autocontrol-dialog.component.html',
  styleUrls: ['./autocontrol-dialog.component.scss'],
})
export class AutocontrolDialogComponent implements OnInit, OnChanges {
  public dialogFields: IAutocontrolDialogField[] = [];
  public active = false;
  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: ['jpg', 'jpeg', 'png', 'pdf'],
  };

  public format = 'MM/dd/yyyy HH:mm';

  public filesToUpload: Array<File> = [];
  public filesToUploadSize: number = 0;
  public formDataValid: boolean = true;


  public get fieldType(): typeof FieldType {
    return FieldType;
  }

  constructor(public autocontrolService: AutocontrolCrudService) {}

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

    this.active = this.nKeyAC > 0;
    if (this.nKeyAC)
      this.autocontrolService
        .getDialogFieldsByACId(this.nKeyAC)
        .subscribe((data) => {
          this.dialogFields = data;
          this.createFormTypedData();
        });
  }

  createFormTypedData() {
    this.dialogFields.forEach((item, index) => {
      this.dialogFields[index].typedValue = this.typeValue(
        item.nACFId,
        item.nFieldDataType,
        item.szValue
      );
    });
    console.log(this.dialogFields);
  }

  createEnumTypedData() {
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

  // createFilesUploadTypedData(nACFId: number) {
  //   const index = this.dialogFields.findIndex((item) => item.nACFId == nACFId);
  //   this.dialogFields[index].typedValue = this.filesToUpload;
  // }

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
        this.createEnumTypedData();
        break;
      case FieldType.File:
        // this.createFilesUploadTypedData(nACFId);
        return this.filesToUpload;
        break;
      case FieldType.Date:
        return Date.parse(value) ? new Date(value) : new Date();

        break;
      case FieldType.Time:
        return Date.parse(value) ? new Date(value) : new Date();

        break;
      case FieldType.DateTime:
        return Date.parse(value) ? new Date(value) : new Date();
        break;
      default:
        return value;
    }
  }

  onSave(e: MouseEvent) {
    console.log('onSave');

    console.log(e);
    e.preventDefault();

    if (this.formDataValid) {
      this.dialogFields.forEach((item) => {
        const nKey = item.nACFId;
        let szValue = '';

        switch (item.nFieldDataType) {
          case FieldType.Integer:
            szValue = item.typedValue.toString();
            this.updateField(nKey, szValue);
            break;
          case FieldType.String:
            szValue = item.typedValue;
            this.updateField(nKey, szValue);
            break;
          case FieldType.Float:
            szValue = item.typedValue.toString();
            this.updateField(nKey, szValue);
            break;
          case FieldType.Enum:
            this.updateEnumField(nKey, item.typedValue);
            break;
          case FieldType.File:
            this.uploadFiles(item.typedValue);
            break;
          case FieldType.Date:
            szValue = item.typedValue.toUTCString();
            this.updateField(nKey, szValue);
            break;
          case FieldType.Time:
            szValue = item.typedValue.toUTCString();
            this.updateField(nKey, szValue);
            break;
          case FieldType.DateTime:
            szValue = item.typedValue.toUTCString();
            this.updateField(nKey, szValue);
            break;
          default:
        }
      });
    }

    this.save.emit();
    this.closeForm();
  }

  uploadFiles(files: File[]) {
    if (files)
      files?.forEach((file: File) => {
        this.autocontrolService.postFile(file).subscribe(
          (response) => {
            console.log('File upload success', response);
          },
          (error) => {
            console.error('File upload error', error);
          }
        );
      });

      this.filesToUpload = [];
  }

  updateEnumField(key: number, enumItem: IAutocontrolFieldEnum) {
    this.updateField(key, enumItem.nEnumValue.toString());
  }

  updateField(nKey: number, value: string) {
    const autocontrolField: IAutocontrolField = {
      nKey: nKey,
      nKeyAC: null,
      nDataXLinkAutoControlField: null,
      rMinValue: null,
      rMaxValue: null,
      szValue: value,
      nUserLink: null,
      tDataMeasured: null,
      tLastUpdated: null,
      bDeleted: false,
    };

    console.log(autocontrolField);
    this.autocontrolService.updateAutocontrolField(autocontrolField).subscribe(
      (response) => {
        console.log('Field updated', response);
      },
      (error) => {
        console.error('Field update error', error);
      }
    );
  }

  onFileSelected(field: IAutocontrolDialogField, event: any) {
    console.log(event.target.files);
    console.log(field);

    const file = event.target.files[0];

    if (file) this.filesToUpload.push(file);

    const index = this.dialogFields.findIndex(
      (item) => item.nACFId == field.nACFId
    );
    console.log(index);

    if (index >= 0) this.dialogFields[index].typedValue=this.filesToUpload;

    this.filesToUpload.forEach(item=> this.filesToUploadSize+=item.size/1000);
  }

  onCancel(e: MouseEvent) {
    e.preventDefault();
    this.cancel.emit();
    this.closeForm();
  }

  closeForm(): void {
    this.active = false;
  }
}
