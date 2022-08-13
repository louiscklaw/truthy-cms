import { FoodItem } from 'src/food-item/entities/food-item.entity';
import { FoodMenu } from 'src/food-menu/entities/food-menu.entity';
import { HelloworldRestCrud } from 'src/helloworld_rest_crud/entities/helloworld_rest_crud.entity';
import { UrlShortcut } from 'src/url-shortcuts/entities/url-shortcut.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  remarks: string;

  @Column({ default: '' })
  slug: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToMany(() => HelloworldRestCrud, helloworldRestCrud => helloworldRestCrud.tags)
  helloworldRestCrud: HelloworldRestCrud[];

  @ManyToMany(() => UrlShortcut, url_shortcut => url_shortcut.tags)
  urlShortcut: UrlShortcut[];

  @ManyToMany(() => FoodItem, food_item => food_item.tags)
  foodItem: FoodItem[];

  @ManyToMany(() => FoodMenu, food_menu => food_menu.tags)
  foodMenu: FoodMenu[];
}
