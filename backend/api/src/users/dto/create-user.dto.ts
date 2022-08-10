import { Tag } from "src/tags/entities/tag.entity";

export class CreateUserDto {
  firstName: string;
  lastName: string;
  tags: Tag[];
}
