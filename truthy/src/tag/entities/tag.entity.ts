import { HelloworldRestCrud } from 'src/helloworld_rest_crud/entities/helloworld_rest_crud.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => HelloworldRestCrud, helloworldRestCrud => helloworldRestCrud.tags)
  helloworldRestCrud: HelloworldRestCrud[];
}
