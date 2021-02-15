import { IBody } from './mail.interface';
export interface IConfirmPayment {
  code: string;
}

export interface IConfirmPaymentJob {
  body: IBody;
  data: IConfirmPayment;
}
