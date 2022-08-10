import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HelloworldRestCrudService } from './helloworld_rest_crud.service';
import { CreateHelloworldRestCrudDto } from './dto/create-helloworld_rest_crud.dto';
import { UpdateHelloworldRestCrudDto } from './dto/update-helloworld_rest_crud.dto';

@Controller('helloworld-rest-crud')
export class HelloworldRestCrudController {
  constructor(private readonly helloworldRestCrudService: HelloworldRestCrudService) {}

  @Post()
  create(@Body() createHelloworldRestCrudDto: CreateHelloworldRestCrudDto) {
    return this.helloworldRestCrudService.create(createHelloworldRestCrudDto);
  }

  @Get()
  findAll() {
    return this.helloworldRestCrudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helloworldRestCrudService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHelloworldRestCrudDto: UpdateHelloworldRestCrudDto) {
    return this.helloworldRestCrudService.update(+id, updateHelloworldRestCrudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helloworldRestCrudService.remove(+id);
  }
}
