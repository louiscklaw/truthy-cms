import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get('/uid/:uuid')
  findOneByUUID(@Param('uuid') uuid: string) {
    return this.restaurantsService.findOneByUuid(uuid);
  }

  @Patch('/uid/:uuid')
  updateByUuid(@Param('uuid') uuid: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.updateByUuid(uuid, updateRestaurantDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.restaurantsService.remove(+id);
  }

  @Delete('uid/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeRestaurantsByUuid(@Param('uuid') uuid: string) {
    return this.restaurantsService.removeRestaurantsByUuid(uuid);
  }

  // @Delete('/uuid/:uuid')
  // removeRestaurantById(@Param('uuid') uuid: string) {
  //   return this.restaurantsService.remove(uuid);
  // }

  @Post('delete_multiple')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeRestaurantsByUuids(@Body() uuids: string[]) {
    return this.restaurantsService.removeRestaurantsByUuids(uuids);
  }
}
