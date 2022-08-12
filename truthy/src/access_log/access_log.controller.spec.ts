import { Test, TestingModule } from '@nestjs/testing';
import { AccessLogController } from './access_log.controller';
import { AccessLogService } from './access_log.service';

describe('AccessLogController', () => {
  let controller: AccessLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessLogController],
      providers: [AccessLogService],
    }).compile();

    controller = module.get<AccessLogController>(AccessLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
