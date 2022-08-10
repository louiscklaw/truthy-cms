import { Tag } from 'src/tag/entities/tag.entity';
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

  @ManyToMany(() => Tag, tag => tag.helloworldRestCrud)
  @JoinTable({
    name: 'helloworld_rest_crud_tag',
    joinColumn: { name: 'helloworld_rest_crud_Id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];
}