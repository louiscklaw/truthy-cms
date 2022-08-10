import { IsBoolean, IsDefined, IsNumber, IsString } from 'class-validator';
import { MenyServiceTypeEntity } from 'src/meny_service_type/entities/meny_service_type.entity';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsBoolean()
  isActive: boolean;

  @IsDefined()
  meny_service_types: MenyServiceTypeEntity[];
}
