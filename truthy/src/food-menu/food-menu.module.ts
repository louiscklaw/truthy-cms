import { Module } from '@nestjs/common';
import { FoodMenuService } from './food-menu.service';
import { FoodMenuController } from './food-menu.controller';

@Module({
  controllers: [FoodMenuController],
  providers: [FoodMenuService]
})
export class FoodMenuModule {}
