import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  // @IsNumber()
  // spent: number;

  @IsBoolean()
  isActive: boolean;
}
