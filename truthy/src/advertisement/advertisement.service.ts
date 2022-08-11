import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Advertisement } from './entities/advertisement.entity';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(Advertisement)
    private repository: Repository<Advertisement>,
  ) {}

  async create(createAdvertisementDto: CreateAdvertisementDto): Promise<Advertisement> {
    return await this.repository.save(createAdvertisementDto);
    // return 'This action adds a new advertisement';
  }

  async findAll(): Promise<any> {
    return await this.repository.find();
    // return `This action returns all advertisement`;
  }

  async findOneByUuid(uuid: string): Promise<any> {
    return await this.repository.findOne({ uuid });
    // return `This action returns a #${id} advertisement`;
  }

  async findOne(id: number): Promise<any> {
    return await this.repository.findOne({ id });
    // return `This action returns a #${id} advertisement`;
  }

  async update(id: number, updateAdvertisementDto: UpdateAdvertisementDto): Promise<any> {
    return await this.repository.save({ ...updateAdvertisementDto, id });
    // return `This action updates a #${id} advertisement`;
  }

  async remove(id: number): Promise<any> {
    return await this.repository.delete(id);
    // return `This action removes a #${id} advertisement`;
  }

  async removeByUuid(uuid: string): Promise<any> {
    console.log({ uuid });
    return await this.repository.delete({ uuid });
    // return `This action removes a #${id} advertisement`;
  }

  async removeAll() {
    let all_record = await this.repository.find();
    for (var i = 0; i < all_record.length; i++) {
      await this.repository.delete(all_record[i].id);
    }
    return;
  }
}
