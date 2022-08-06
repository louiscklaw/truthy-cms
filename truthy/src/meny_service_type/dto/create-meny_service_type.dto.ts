import { IsBoolean, IsString } from 'class-validator';

export class CreateMenyServiceTypeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  canEditMenu: boolean;

  @IsBoolean()
  canEditRestaurant: boolean;

  @IsBoolean()
  canProcessStayOrder: boolean;

  @IsBoolean()
  canProcessTakeAwayOrder: boolean;
}
