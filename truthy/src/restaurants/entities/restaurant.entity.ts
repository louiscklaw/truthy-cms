// https://docs.nestjs.com/techniques/database#repository-pattern

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @PrimaryGeneratedColumn('uuid')
// id: string;

@Entity({ name: 'restaurants' })
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Full name
  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  country: string;

  @Column({ default: '' })
  state: string;

  @Column({ default: '' })
  address1: string;

  @Column({ default: '' })
  address2: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  location: string;

  @Column({ type: 'int', default: 0 })
  orders: number;

  @Column({ type: 'float', default: 0 })
  spent: number;

  @Column({ default: true })
  isActive: boolean;
}
