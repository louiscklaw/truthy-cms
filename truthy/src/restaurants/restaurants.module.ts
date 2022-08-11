import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './entities/restaurant.entity';
import { MenyServiceTypeEntity } from 'src/meny_service_type/entities/meny_service_type.entity';
import { MenyServiceTypeService } from 'src/meny_service_type/meny_service_type.service';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity, MenyServiceTypeEntity])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, MenyServiceTypeService],
})
export class RestaurantsModule {}
