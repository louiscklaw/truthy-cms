import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { HelloworldRestCrudService } from './helloworld_rest_crud.service';
import { CreateHelloworldRestCrudDto } from './dto/create-helloworld_rest_crud.dto';
import { UpdateHelloworldRestCrudDto } from './dto/update-helloworld_rest_crud.dto';

@Controller('helloworld-rest-crud')
export class HelloworldRestCrudController {
  constructor(private readonly helloworldRestCrudService: HelloworldRestCrudService) {}

  @Get('/helloworld')
  helloworld() {
    return { hello: `helloworld-rest-crud world` };
  }

  @Post()
  async create(@Body() createHelloworldRestCrudDto: CreateHelloworldRestCrudDto): Promise<CreateHelloworldRestCrudDto> {
    return this.helloworldRestCrudService.create(createHelloworldRestCrudDto);
  }

  @Get()
  findAll() {
    return this.helloworldRestCrudService.findAll();
  }

  @Get('/delete_all')
  @HttpCode(HttpStatus.NO_CONTENT)
  async helloWorldBlaBlaBla(): Promise<void> {
    return this.helloworldRestCrudService.removeAll();
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
