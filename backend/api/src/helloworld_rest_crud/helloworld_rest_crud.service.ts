import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHelloworldRestCrudDto } from './dto/create-helloworld_rest_crud.dto';
import { UpdateHelloworldRestCrudDto } from './dto/update-helloworld_rest_crud.dto';
import { HelloworldRestCrud } from './entities/helloworld_rest_crud.entity';

@Injectable()
export class HelloworldRestCrudService {
  constructor(
    @InjectRepository(HelloworldRestCrud)
    private readonly repository: Repository<HelloworldRestCrud>,
  ) {}

  async create(createHelloworldRestCrudDto: CreateHelloworldRestCrudDto): Promise<HelloworldRestCrud> {
    return await this.repository.save(createHelloworldRestCrudDto);
    // return 'This action adds a new helloworldRestCrud';
  }

  async findAll(): Promise<HelloworldRestCrud[]> {
    return await this.repository.find({ relations: { tags: true } });
    // return `This action returns all helloworldRestCrud`;
  }

  async findOne(id: number): Promise<HelloworldRestCrud> {
    return await this.repository.findOneBy({ id });
    // return `This action returns a #${id} helloworldRestCrud`;
  }

  async update(id: number, updateHelloworldRestCrudDto: UpdateHelloworldRestCrudDto): Promise<any> {
    return await this.repository.update({ id }, updateHelloworldRestCrudDto);

    // return `This action updates a #${id} helloworldRestCrud`;
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete({ id });
    return;

    // return `This action removes a #${id} helloworldRestCrud`;
  }
}
