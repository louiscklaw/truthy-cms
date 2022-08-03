// https://docs.nestjs.com/techniques/database#repository-pattern

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'helloworld' })
export class HelloworldEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
