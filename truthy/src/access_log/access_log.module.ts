import { Module } from '@nestjs/common';
import { AccessLogService } from './access_log.service';
import { AccessLogController } from './access_log.controller';

@Module({
  controllers: [AccessLogController],
  providers: [AccessLogService]
})
export class AccessLogModule {}
