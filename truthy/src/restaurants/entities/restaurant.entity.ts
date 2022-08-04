// https://docs.nestjs.com/techniques/database#repository-pattern

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'restaurants' })
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ type: 'int' })
  orders: number;

  @Column({ type: 'float' })
  spent: number;

  @Column({ default: true })
  isActive: boolean;
}
