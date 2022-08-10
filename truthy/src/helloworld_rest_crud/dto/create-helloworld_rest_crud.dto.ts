import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { Tag } from 'src/tag/entities/tag.entity';

export class CreateHelloworldRestCrudDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean;

  @IsDefined()
  tags: Tag[];
}
