export interface IAutocontrol {
  nACId: number;
  szLineName: string;
  szACName: string;
  szArea: string;
  nStatus: number;
  szStatus: string;
  szComment: string;
  tLastModified: Date;
  enableButtons: boolean;
}

export interface IAutocontrolDialogField {
  nACFId: number;
  nACId: number;
  szACName: string;
  szGroupName: string;
  szACFieldName: string;
  nFieldDataType: number;
  bHasLimit: number;
  rMinValue: number;
  rMaxValue: number;
  szValue: string;
  typedValue: any;
  enumData:IAutocontrolFieldEnum[];
}
export interface IAutocontrolField {
  nKey: number | null;
  nKeyAC: number | null;
  nDataXLinkAutoControlField: number | null;
  rMinValue: number | null;
  rMaxValue: number | null;
  szValue: string;
  nUserLink: number | null;
  tDataMeasured: Date | null;
  tLastUpdated: Date | null;
  bDeleted: boolean;
}

export interface IAutocontrolFieldEnum {
  nACFId: number;
  nEnumValue: number;
  szEnumValue: string;
}
