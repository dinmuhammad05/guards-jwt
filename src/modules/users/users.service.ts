import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IsuccessRes } from 'src/interfaces/success-res';
import { getSuccessRes } from 'src/utils/get-succes-res';
import { generateToken } from 'src/utils/generate-token';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IsuccessRes> {
    const newData = new Object(createUserDto);
    const data = await this.userRepo.save(newData);
    return getSuccessRes(data, 201);
  }

  async findAll(): Promise<IsuccessRes> {
    const data = await this.userRepo.find({ relations: { cars: true } });

    return getSuccessRes(data);
  }

  
  async findOne(id: number): Promise<IsuccessRes> {
    const data = await this.userRepo.findOne({
      where: { id },
      relations: { cars: true },
    });
    if (!data) throw new NotFoundException('user not found');
    return getSuccessRes(data);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<IsuccessRes> {
    await this.userRepo.update({ id }, updateUserDto);
    const data = await this.userRepo.findOne({ where: { id } });
    if (!data) throw new NotFoundException('user not found');
    return getSuccessRes(data);
  }

  async remove(id: number): Promise<IsuccessRes> {
    const data = await this.userRepo.delete({ id });
    if (!data.affected) throw new NotFoundException('user not found');
    return getSuccessRes({});
  }

  async signin(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    const token = await generateToken({ id: user.id, role: user.role });

    return getSuccessRes({ user, token });
  }
}
