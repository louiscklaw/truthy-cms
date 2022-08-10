import { Tag } from "src/tags/entities/tag.entity";

export class UpdateUserDto {
  firstName: string;
  lastName: string;
  tags: Tag[];
}
