import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  version: number;

  @Column('bigint')
  @Transform(({ value }) => +value)
  createdAt: number;

  @Column('bigint')
  @Transform(({ value }) => +value)
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
