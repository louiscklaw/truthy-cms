import { HelloworldRestCrud } from 'src/helloworld_rest_crud/entities/helloworld_rest_crud.entity';
import { UrlShortcut } from 'src/url-shortcuts/entities/url-shortcut.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  remarks: string;

  @Column({ default: '' })
  slug: string;

  @ManyToMany(() => HelloworldRestCrud, helloworldRestCrud => helloworldRestCrud.tags)
  helloworldRestCrud: HelloworldRestCrud[];

  @ManyToMany(() => UrlShortcut, url_shortcut => url_shortcut.tags)
  urlShortcut: UrlShortcut[];
}
