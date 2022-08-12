import { IsBoolean, IsDefined, IsNumber, IsString } from 'class-validator';
import { Tag } from 'src/tag/entities/tag.entity';

export class CreateUrlShortcutDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  longURL: string;

  @IsString()
  uniqueID: string;

  @IsBoolean()
  isActive: boolean;

  @IsDefined()
  tags: Tag[];
}
