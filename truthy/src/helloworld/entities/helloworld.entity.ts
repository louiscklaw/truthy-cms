// https://docs.nestjs.com/techniques/database#repository-pattern

// Typeorm column type definitions
// https://orkhan.gitbook.io/typeorm/docs/entities#column-types-for-postgres

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'helloworld' })
export class HelloworldEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  // https://orkhan.gitbook.io/typeorm/docs/entities#what-is-entity
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
