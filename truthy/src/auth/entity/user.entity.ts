import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

import { UserStatusEnum } from '../../auth/user-status.enum';
import { CustomBaseEntity } from '../../common/entity/custom-base.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { MenyServiceTypeEntity } from 'src/meny_service_type/entities/meny_service_type.entity';

/**
 * User Entity
 */
@Entity({ name: 'user' })
export class UserEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  username: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Index()
  @Column()
  name: string;

  @Column({ default: null })
  phone: string;

  @Column({ default: null })
  state: string;

  @Column({ default: null })
  user_type: string;

  @Column({ default: null })
  country: string;

  @Column({ default: null })
  address: string;

  @Column({ default: null })
  address1: string;

  @Column({ default: null })
  address2: string;

  @Column({ default: null })
  contact: string;

  @Column({ default: null })
  avatar: string;

  @Column({ default: UserStatusEnum.ACTIVE })
  status: UserStatusEnum;

  @Column({ default: null })
  @Exclude({ toPlainOnly: true })
  token: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  tokenValidityDate: Date;

  @Column()
  @Exclude({ toPlainOnly: true })
  salt: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  twoFASecret?: string;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  twoFAThrottleTime?: Date;

  @Column({ default: false })
  isTwoFAEnabled: boolean;

  @Column({ default: false })
  hasDiscount: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: true })
  contact_info_public: boolean;

  @Column({ default: true })
  available_to_hire: boolean;

  @Exclude({ toPlainOnly: true })
  skipHashPassword = false;

  @OneToOne(() => RoleEntity)
  @JoinColumn()
  role: RoleEntity;

  @Column()
  roleId: number;

  @ManyToMany(() => MenyServiceTypeEntity, meny_service_type => meny_service_type.users)
  @JoinTable({
    name: 'user_meny_service_type',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'meny_service_type_id', referencedColumnName: 'id' },
  })
  meny_service_type: MenyServiceTypeEntity[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password && !this.skipHashPassword) {
      await this.hashPassword();
    }
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.password && !this.skipHashPassword) {
      await this.hashPassword();
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, this.salt);
  }
}
