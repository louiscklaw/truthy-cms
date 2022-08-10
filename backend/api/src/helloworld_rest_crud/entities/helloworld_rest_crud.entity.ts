import { Tag } from 'src/tags/entities/tag.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HelloworldRestCrud {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Tag, tag => tag.users)
  @JoinTable({
    name: 'helloworld_crud_rest_tag',
    joinColumn: { name: 'helloworldCrudRestId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];
}
