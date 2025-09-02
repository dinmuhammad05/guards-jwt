import { Car } from 'src/modules/cars/entities/car.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
  USER = 'user',
  ID = 'ID',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SUPER_ADMIN, // optional default
  })
  role: UserRole;

  @OneToMany(() => Car, (car) => car.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cars: Car[];
}
