import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateHelloworldRestCrudDto } from './dto/create-helloworld_rest_crud.dto';
import { UpdateHelloworldRestCrudDto } from './dto/update-helloworld_rest_crud.dto';
import { HelloworldRestCrud } from './entities/helloworld_rest_crud.entity';

@Injectable()
export class HelloworldRestCrudService {
  constructor(
    @InjectRepository(HelloworldRestCrud)
    private repository: Repository<HelloworldRestCrud>,
  ) {}

  async create(createHelloworldRestCrudDto: CreateHelloworldRestCrudDto): Promise<HelloworldRestCrud> {
    return await this.repository.save(createHelloworldRestCrudDto);
    // return 'This action adds a new helloworldRestCrud';
  }

  async findAll(): Promise<HelloworldRestCrud[]> {
    return await this.repository.find({ relations: ['tags'] });
    // return `This action returns all helloworldRestCrud`;
  }

  async findOne(id: number): Promise<HelloworldRestCrud> {
    // return `This action returns a #${id} helloworldRestCrud`;
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateHelloworldRestCrudDto: UpdateHelloworldRestCrudDto): Promise<UpdateResult> {
    // return `This action updates a #${id} helloworldRestCrud`;
    return await this.repository.update({ id }, updateHelloworldRestCrudDto);
  }

  async remove(id: number): Promise<void> {
    // return `This action removes a #${id} helloworldRestCrud`;
    await this.repository.delete({ id });
    return;
  }

  async removeAll(): Promise<void> {
    const all_record = await this.repository.find();
    for (let i = 0; i < all_record.length; i++) {
      await this.repository.delete(all_record[i].id);
    }
    return;
  }
}
