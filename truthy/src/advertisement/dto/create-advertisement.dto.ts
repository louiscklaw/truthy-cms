import { IsBoolean, IsString } from 'class-validator';

export class CreateAdvertisementDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  remarks: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  slug: string;
}
