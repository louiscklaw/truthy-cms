import { IsBoolean, IsString } from 'class-validator';

export class CreateHelloworldDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  isActive: boolean;
}