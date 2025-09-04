import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 123 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'admin' })
  @IsString()
  role: string;
}
