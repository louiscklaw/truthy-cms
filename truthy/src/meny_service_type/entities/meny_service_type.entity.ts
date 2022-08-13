import { UserEntity } from 'src/auth/entity/user.entity';
import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'meny_service_type' })
export class MenyServiceTypeEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: false })
  canEditMenu: boolean;

  @Column({ default: false })
  canEditRestaurant: boolean;

  @Column({ default: false })
  canProcessStayOrder: boolean;

  @Column({ default: false })
  canProcessTakeAwayOrder: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(() => UserEntity, user => user.meny_service_type)
  users: UserEntity[];

  @ManyToMany(() => RestaurantEntity, restaurant => restaurant.meny_service_types)
  restaurants: RestaurantEntity[];
}
