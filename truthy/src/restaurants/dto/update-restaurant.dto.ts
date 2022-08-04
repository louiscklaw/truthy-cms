import { PartialType } from '@nestjs/swagger';
import { IsBoolean, isNumber, IsNumber, IsString } from 'class-validator';
import { CreateRestaurantDto } from './create-restaurant.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  address: string;

  @IsString()
  address1: string;

  @IsString()
  address2: string;

  @IsString()
  country: string;

  @IsString()
  email: string;

  @IsNumber()
  orders: number;

  @IsNumber()
  spent: number;

  @IsString()
  state: string;

  @IsString()
  phone: string;

  @IsBoolean()
  isActive: boolean;
}
