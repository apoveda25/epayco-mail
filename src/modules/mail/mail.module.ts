import { Module, HttpModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailConsumer } from './mail.consumer';
import { MAIL_QUEUE } from './mail.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: MAIL_QUEUE,
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('sendinblue.url'),
        headers: {
          common: { 'api-key': configService.get('sendinblue.api_key') },
        },
      }),
    }),
    ConfigModule,
  ],
  providers: [MailConsumer],
})
export class MailModule {}
