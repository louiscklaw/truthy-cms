import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsBoolean()
  isActive: boolean;
}
