import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { Tag } from 'src/tag/entities/tag.entity';

export class CreateHelloworldRestCrudDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  isActive: boolean;

  @IsDefined()
  tags: Tag[];
}
