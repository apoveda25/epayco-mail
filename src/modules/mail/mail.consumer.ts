import { ConfigService } from '@nestjs/config';
import { HttpException, HttpService } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import {
  MAIL_QUEUE,
  CONFIRM_PAYMENT_JOB,
  CONFIRM_PAYMENT_SUBJECT,
} from './mail.constants';
import { IConfirmPaymentJob } from './interfaces/confirm-payment.interface';
import { IBody } from './interfaces/mail.interface';

@Processor(MAIL_QUEUE)
export class MailConsumer {
  private readonly bodyDefaultConfirmPayment: IBody;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.bodyDefaultConfirmPayment = {
      sender: {
        name: this.configService.get('sendinblue.name'),
        email: this.configService.get('sendinblue.email_from'),
      },
      subject: CONFIRM_PAYMENT_SUBJECT,
    };
  }

  @Process(CONFIRM_PAYMENT_JOB)
  async confirmPayment(job: Job<IConfirmPaymentJob>) {
    try {
      return await this.httpService
        .post('/smtp/email', {
          ...this.bodyDefaultConfirmPayment,
          textContent: `El código para confirmar su pago es: ${job.data.data.code}`,
          ...job.data.body,
        })
        .toPromise();
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
