import { Tag } from 'src/tag/entities/tag.entity';

export class CreateHelloworldRestCrudDto {
  firstName: string;

  lastName: string;

  isActive: boolean;

  tags: Tag[];
}
