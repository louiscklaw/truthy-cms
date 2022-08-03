import { Module } from '@nestjs/common';
import { MenyServiceTypeService } from './meny_service_type.service';
import { MenyServiceTypeController } from './meny_service_type.controller';

@Module({
  controllers: [MenyServiceTypeController],
  providers: [MenyServiceTypeService],
})
export class MenyServiceTypeModule {}
