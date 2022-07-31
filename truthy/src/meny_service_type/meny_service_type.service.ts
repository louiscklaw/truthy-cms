import { Injectable } from '@nestjs/common';
import { CreateMenyServiceTypeDto } from './dto/create-meny_service_type.dto';
import { UpdateMenyServiceTypeDto } from './dto/update-meny_service_type.dto';

@Injectable()
export class MenyServiceTypeService {
  create(createMenyServiceTypeDto: CreateMenyServiceTypeDto) {
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
