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
    private restaurantRepository: Repository<MenyServiceTypeEntity>,
  ) {}

  async create(createMenyServiceTypeDto: CreateMenyServiceTypeDto): Promise<any> {
    let { id } = await this.restaurantRepository.save(createMenyServiceTypeDto);
    return { ...createMenyServiceTypeDto, id };
    return 'This action adds a new menyServiceType';
  }

  findAll() {
    return `This action returns all menyServiceType`;
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
}
