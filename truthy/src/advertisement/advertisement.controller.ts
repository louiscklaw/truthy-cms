import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';

@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly service: AdvertisementService) {}

  @Post()
  create(@Body() createAdvertisementDto: CreateAdvertisementDto) {
    return this.service.create(createAdvertisementDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('/uid/:uuid')
  findOneByUuid(@Param('uuid') uuid: string) {
    return this.service.findOneByUuid(uuid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvertisementDto: UpdateAdvertisementDto) {
    return this.service.update(+id, updateAdvertisementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Delete('/util/delete_all')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAllRestaurant(@Body() uuids: string[]) {
    return this.service.removeAll();
  }
}
