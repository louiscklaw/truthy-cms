import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DockerService } from './docker.service';
import { CreateDockerDto } from './dto/create-docker.dto';
import { UpdateDockerDto } from './dto/update-docker.dto';

@Controller('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @Post()
  create(@Body() createDockerDto: CreateDockerDto) {
    return this.dockerService.create(createDockerDto);
  }

  @Get()
  findAll() {
    return this.dockerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dockerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDockerDto: UpdateDockerDto) {
    return this.dockerService.update(+id, updateDockerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dockerService.remove(+id);
  }
}
