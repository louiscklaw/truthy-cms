import { UserEntity } from 'src/auth/entity/user.entity';
import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'meny_service_type' })
export class MenyServiceTypeEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(type => UserEntity, user => user.meny_service_type)
  users: UserEntity[];
}
