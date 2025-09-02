import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { IsuccessRes } from 'src/interfaces/success-res';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { getSuccessRes } from 'src/utils/get-succes-res';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carRepo: Repository<Car>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createCarDto: CreateCarDto): Promise<IsuccessRes> {
    const user = await this.userRepo.findOne({
      where: { id: createCarDto.user_id },
    });
    if (!user) throw new NotFoundException('uset not found');

    const newData = new Object({ ...createCarDto, user });
    const data = await this.carRepo.save(newData);
    return getSuccessRes(data, 201);
  }

  async findAll(): Promise<IsuccessRes> {
    const data = await this.carRepo.find({ relations: { user: true } });
    return getSuccessRes(data);
  }

  async findOne(id: number): Promise<IsuccessRes> {
    const data = await this.carRepo.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!data) throw new NotFoundException('car not found');
    return getSuccessRes(data);
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<IsuccessRes> {
    if (updateCarDto.user_id) {
      const user = await this.userRepo.findOne({
        where: { id: updateCarDto.user_id },
      });
      if (!user) throw new NotFoundException('uset not found');
      delete updateCarDto.user_id;
      await this.carRepo.update({ id }, { ...updateCarDto, user });
    } else {
      await this.carRepo.update({ id }, updateCarDto);
    }

    const data = await this.carRepo.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!data) throw new NotFoundException('car not found');
    return getSuccessRes(data);
  }

  async remove(id: number): Promise<IsuccessRes> {
    const data = await this.carRepo.delete({ id });
    return getSuccessRes({});
  }
}
