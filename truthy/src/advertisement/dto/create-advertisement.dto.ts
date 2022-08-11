import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class CreateAdvertisementDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDefined()
  images: string;

  @IsString()
  remarks: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  slug: string;
}
