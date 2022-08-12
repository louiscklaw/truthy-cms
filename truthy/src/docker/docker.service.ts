import { Injectable } from '@nestjs/common';
import { CreateDockerDto } from './dto/create-docker.dto';
import { UpdateDockerDto } from './dto/update-docker.dto';

@Injectable()
export class DockerService {
  create(createDockerDto: CreateDockerDto) {
    return 'This action adds a new docker';
  }

  findAll() {
    return `This action returns all docker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} docker`;
  }

  update(id: number, updateDockerDto: UpdateDockerDto) {
    return `This action updates a #${id} docker`;
  }

  remove(id: number) {
    return `This action removes a #${id} docker`;
  }
}
