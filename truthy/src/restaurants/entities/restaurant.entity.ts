// https://docs.nestjs.com/techniques/database#repository-pattern

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'restaurants' })
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  location: string;

  // @Column({ type: 'int', default: 0 })
  // orders: number;

  // @Column({ type: 'float', default: 0 })
  // spent: number;

  // @Column({ default: true })
  // isActive: boolean;
}
