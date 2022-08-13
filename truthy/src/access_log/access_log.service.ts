import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccessLogDto } from './dto/create-access_log.dto';
import { UpdateAccessLogDto } from './dto/update-access_log.dto';
import { AccessLog } from './entities/access_log.entity';

@Injectable()
export class AccessLogService {
  constructor(
    @InjectRepository(AccessLog)
    private readonly repository: Repository<AccessLog>,
  ) {}

  create(createAccessLogDto: CreateAccessLogDto) {
    // return 'This action adds a new accessLog';
    return this.repository.save(createAccessLogDto);
  }

  findAll() {
    // return `This action returns all accessLog`;
    return this.repository.find();
  }

  findOne(id: number) {
    // return `This action returns a #${id} accessLog`;
    return this.repository.findOne(+id);
  }

  update(id: number, updateAccessLogDto: UpdateAccessLogDto) {
    return { message: `update banned in access log` };
  }

  remove(id: number) {
    return { message: `remove banned in access log` };
  }
}
