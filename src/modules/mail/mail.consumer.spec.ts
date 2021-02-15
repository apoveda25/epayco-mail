import { Test, TestingModule } from '@nestjs/testing';
import { MailConsumer } from './mail.consumer';

describe('MailConsumer', () => {
  let provider: MailConsumer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailConsumer],
    }).compile();

    provider = module.get<MailConsumer>(MailConsumer);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
