import { Tag } from 'src/tag/entities/tag.entity';
import { Column, Entity, Generated, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UrlShortcut {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  longURL: string;

  @Index()
  @Column({ default: '' })
  uniqueID: string;

  @Column({ default: '' })
  shortURL: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Tag, tag => tag.urlShortcut)
  @JoinTable({
    name: 'urlShortcut_tag',
    joinColumn: { name: 'urlShortcut_Id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];
}
