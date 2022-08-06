import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenyServiceTypeService } from './meny_service_type.service';
import { CreateMenyServiceTypeDto } from './dto/create-meny_service_type.dto';
import { UpdateMenyServiceTypeDto } from './dto/update-meny_service_type.dto';

@Controller('meny-service-type')
export class MenyServiceTypeController {
  constructor(private readonly menyServiceTypeService: MenyServiceTypeService) {}

  @Post()
  create(@Body() createMenyServiceTypeDto: CreateMenyServiceTypeDto) {
    console.log('running meny service type post');
    return this.menyServiceTypeService.create(createMenyServiceTypeDto);
  }

  @Get()
  findAll() {
    return this.menyServiceTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menyServiceTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenyServiceTypeDto: UpdateMenyServiceTypeDto) {
    return this.menyServiceTypeService.update(+id, updateMenyServiceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menyServiceTypeService.remove(+id);
  }
}
