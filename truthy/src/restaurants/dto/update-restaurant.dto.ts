import { PartialType } from '@nestjs/swagger';
import { IsBoolean, isNumber, IsNumber, IsString } from 'class-validator';
import { CreateRestaurantDto } from './create-restaurant.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
