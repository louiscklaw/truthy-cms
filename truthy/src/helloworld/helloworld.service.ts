// https://docs.nestjs.com/techniques/database#repository-pattern

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHelloworldDto } from './dto/create-helloworld.dto';
import { UpdateHelloworldDto } from './dto/update-helloworld.dto';
import { HelloworldEntity } from './entities/helloworld.entity';

@Injectable()
export class HelloworldService {
  constructor(
    @InjectRepository(HelloworldEntity)
    private helloworldRepository: Repository<HelloworldEntity>,
  ) {}

  async create(createHelloworldDto: CreateHelloworldDto): Promise<any> {
    // this.helloworldRepository.save({
    //   firstName: createHelloworldDto.firstName,
    //   lastName: createHelloworldDto.lastName,
    //   isActive: createHelloworldDto.isActive,
    // });

    let { id } = await this.helloworldRepository.save(createHelloworldDto);
    return { ...createHelloworldDto, id };
  }

  async findAll(): Promise<HelloworldEntity[]> {
    return this.helloworldRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} helloworld`;
  }

  async update(id: number, updateHelloworldDto: UpdateHelloworldDto): Promise<any> {
    let result = await this.helloworldRepository.update(id, updateHelloworldDto);
    return result;
  }

  async remove(id: number): Promise<void> {
    await this.helloworldRepository.delete(id);
  }
}
