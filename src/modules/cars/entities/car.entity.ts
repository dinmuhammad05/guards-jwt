import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('car')
export class Car {
@PrimaryGeneratedColumn()
id:number

@Column({type:'varchar'})
company:string

@Column({type:'varchar'})
model:string

@ManyToOne(() => User, (user) => user.cars, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
