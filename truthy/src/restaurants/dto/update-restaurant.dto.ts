import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { CreateRestaurantDto } from './create-restaurant.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsNumber()
  orders: number;

  @IsBoolean()
  isActive: boolean;
}
