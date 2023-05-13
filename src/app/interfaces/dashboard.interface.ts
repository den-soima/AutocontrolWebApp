import { Data } from '@angular/router';

export interface DashboardData {
  topPercent: number;
  nCurrentMachineState: number;
  szCurrentMachineState: string;
  szColorCurrentMachineState: string;
  nCurrentMachineState2: number;
  szCurrentMachineState2: number;
  szColorCurrentMachineState2: string;
  ratioOfCurrentShiftDuration: number;
  nDataXLinkLine: number;
  nShiftKey: number;
  szMachine: string;
  nShiftPercent: number;
  nEstimatedShift: number;
  nObjEff: number;
  szCurrentOrder: string;
  szFormat: string;
  nRatedCapacity: number;
  goodQty: number;
  fullInspector: number;
  emptyInspector: number;
  waterQty: number;
  nTank1: number;
  nTank2: number;
  nVolTank1: number;
  waterRate: number;
  secProductionTime: number;
}

export interface DashboardHeader {
  actualShift: Date;
  actualTime: Date;
  duration: Date;
}
