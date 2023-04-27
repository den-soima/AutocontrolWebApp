export interface ReportLine{
  lineLink: number,
  lineName: string
}

export interface ReportHeader{
  actualTime: Date;
  actualDate: Date;
  lineName: string;
  nFillerMachine: number;
}
