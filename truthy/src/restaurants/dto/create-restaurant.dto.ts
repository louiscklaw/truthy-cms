import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  // @IsNumber())
  // orders: number;

  // @IsNumber()
  // spent: number;

  // @IsBoolean()
  // isActive: boolean;
}
