// https://docs.nestjs.com/techniques/database#repository-pattern

import { UserEntity } from 'src/auth/entity/user.entity';
import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { MenyServiceTypeEntity } from 'src/meny_service_type/entities/meny_service_type.entity';
import { Column, Entity, Generated, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

// @PrimaryGeneratedColumn('uuid')
// id: string;

@Entity({ name: 'restaurants' })
export class RestaurantEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

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
  address: string;

  @Column({ default: '' })
  address1: string;

  @Column({ default: '' })
  address2: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  location: string;

  @Column({ default: '' })
  slug: string;

  @Column({ type: 'int', default: 0 })
  favorite: number;

  @Column({ type: 'int', default: 0 })
  bookmark: number;

  @Column({ type: 'int', default: 0 })
  orders: number;

  @Column({ type: 'float', default: 0 })
  spent: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => MenyServiceTypeEntity, menyServiceType => menyServiceType.restaurants)
  @JoinTable({
    name: 'restaurant_meny_service_type',
    joinColumn: { name: 'restaurantId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'menyServiceTypeId', referencedColumnName: 'id' },
  })
  meny_service_types: MenyServiceTypeEntity[];

  @ManyToMany(() => UserEntity, user => user.restaurants)
  @JoinTable({
    name: 'restaursnt_operator',
    joinColumn: { name: 'restaurantId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  operators: UserEntity[];
}
