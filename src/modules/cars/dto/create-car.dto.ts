import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';
import { ManyToOne } from 'typeorm';

export class CreateCarDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
