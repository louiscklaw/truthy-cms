import { Module } from '@nestjs/common';
import { MenyServiceTypeService } from './meny_service_type.service';
import { MenyServiceTypeController } from './meny_service_type.controller';
import { MenyServiceTypeEntity } from './entities/meny_service_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MenyServiceTypeEntity])],
  controllers: [MenyServiceTypeController],
  providers: [MenyServiceTypeService],
})
export class MenyServiceTypeModule {}
