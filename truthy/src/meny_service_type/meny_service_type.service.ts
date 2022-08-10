import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenyServiceTypeDto } from './dto/create-meny_service_type.dto';
import { UpdateMenyServiceTypeDto } from './dto/update-meny_service_type.dto';
import { MenyServiceTypeEntity } from './entities/meny_service_type.entity';

@Injectable()
export class MenyServiceTypeService {
  constructor(
    @InjectRepository(MenyServiceTypeEntity)
    private repository: Repository<MenyServiceTypeEntity>,
  ) {}

  async create(createMenyServiceTypeDto: CreateMenyServiceTypeDto): Promise<any> {
    let { id } = await this.repository.save(createMenyServiceTypeDto);
    return { ...createMenyServiceTypeDto, id };
    return 'This action adds a new menyServiceType';
  }

  async findAll(): Promise<MenyServiceTypeEntity[]> {
    return await this.repository.find();
    // return `This action returns all menyServiceType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menyServiceType`;
  }

  update(id: number, updateMenyServiceTypeDto: UpdateMenyServiceTypeDto) {
    return `This action updates a #${id} menyServiceType`;
  }

  remove(id: number) {
    return `This action removes a #${id} menyServiceType`;
  }

  async removeAll() {
    let all_record = await this.repository.find();
    for (var i = 0; i < all_record.length; i++) {
      console.log('deleting: ', all_record[i].id);
      await this.repository.delete(all_record[i].id);
    }
    return;
  }
}
