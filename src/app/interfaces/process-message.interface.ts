export interface ProcessMessage {
  message: string;
  error: boolean;
  continue: boolean;
  weight: number;
  done: boolean;
}
