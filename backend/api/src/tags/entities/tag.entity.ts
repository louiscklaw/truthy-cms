import { HelloworldRestCrud } from 'src/helloworld_rest_crud/entities/helloworld_rest_crud.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.tags)
  users: User[];

  @ManyToMany(() => HelloworldRestCrud, helloworld_rest_crud => helloworld_rest_crud.tags)
  helloworld_rest_cruds: HelloworldRestCrud[];
}
