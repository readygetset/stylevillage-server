import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import BaseTime from './baseTime.entity';
import User from './user.entity';

@Entity()
@Unique(['username'])
export default class Closet extends BaseTime {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, {
    cascade: ['insert', 'recover', 'update'],
  })
  owner!: User;

  @Column({
    type: 'varchar',
    default: '기본',
  })
  name!: string;
}
