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
  hoursAgo: number;
  hourRecorded: number;
  percEff: number;
  percEffAcumulado: number;
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
  machine: string;
  nTime: number;
  colorCode: string;
  pStateNumber: number;
  bProductive: number;
  sortOrder: number;
}

export interface ReportProductionInfo {
  nRatedCapacity: number;
  nNominalProduction: number;
  rShiftPercentage: number;
  actualProductionCaj: number;
  actualProduction: number;
  actualProduction1h: number;
  ratioOfCurrentShiftDuration: number;
  vacio: number;
  llenadora: number;
  lleno: number;
  vacio1h: number;
  llenadora1h: number;
  lleno1h: number;
  up: number;
  o2: number;
  cO2: number;
  aguaBlanda: number;
  aguaFria: number;
  formatUnit: string;
  capacityUnit: string;
  skuUnit: string;
  bbt: number;
  semana: number;
  turno: number;

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
