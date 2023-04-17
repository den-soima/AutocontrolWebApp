export interface DashboardData {
    Line: string,
    Nominal: number,
    Produced: number,
    Inspectores: {
      Vacio: number,
      Lieno: number,
    },
    Estimated: number,
    TankActual: {
      Number: number,
      Volume: number,
    },
    TankInQueue: {
      Number: number,
      Volume: number,
    },
    RatioAqua: number,
    EficienciaTiempo: number,
    Ranking: number,
    ProductionTime: number,
    Status: {
      Phase1: number,
      Phase2: number
    },

}
