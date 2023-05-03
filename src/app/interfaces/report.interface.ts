export interface ReportLine {
  lineLink: number;
  lineName: string;
}

export interface ReportHeader {
  actualTime: Date;
  actualDate: Date;
  lineName: string;
  nFillerMachine: number;
}

export interface ReportEfficiency {
  HoursAgo: number;
  HourRecorded: number;
  PercEff: number;
  PercEffAcumulado: number;
}

export interface ReportErrorList {
  reason: string;
  machine: string;
  countError: number;
}

export interface ReportMachineError {
  szText: string;
  efficiency: number;
  speed: number;
  nError: number;
  nSortOrder: number;
  colorCode: string;
  fontColor: string;
}

export interface ReportStatesGraph {
  Machine: string;
  nTime: number;
  ColorCode: string;
  pStateNumber: number;
  bProductive: number;
  pSortOrder: number;
}

export interface ReportProductionInfo {
  nRatedCapacity: number;
  nNominalProduction: number;
  rShiftPercentage: number;
  ActualProductionCaj: number;
  ActualProduction: number;
  ActualProduction1h: number;
  RatioOfCurrentShiftDuration: number;
  Vacio: number;
  Llenadora: number;
  Lleno: number;
  Vacio1h: number;
  Llenadora1h: number;
  Lleno1h: number;
  UP: number;
  O2: number;
  CO2: number;
  AguaBlanda: number;
  AguaFría: number;
  FormatUnit: string;
  CapacityUnit: string;
  SKUUnit: string;
}

export interface ReportData {
  header: ReportHeader | undefined;
  productionInfo: ReportProductionInfo | undefined;
  machineError: ReportMachineError[] | undefined;
  machineError2: ReportMachineError[] | undefined;
  statesGraph: ReportStatesGraph[] | undefined;
  efficiency: ReportEfficiency[] | undefined;
  errorList: ReportErrorList[] | undefined;
}

export interface ReporDataLoadingStatus {
  header: boolean;
  productionInfo: boolean;
  machineError: boolean;
  machineError2: boolean;
  statesGraph: boolean;
  efficiency: boolean;
  errorList: boolean;
  dataLoaded: boolean;
  loadProgress: number;
}
