import { Module } from '@nestjs/common';
import { AccessLogService } from './access_log.service';
import { AccessLogController } from './access_log.controller';
import { AccessLog } from './entities/access_log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AccessLog])],
  controllers: [AccessLogController],
  providers: [AccessLogService],
})
export class AccessLogModule {}
