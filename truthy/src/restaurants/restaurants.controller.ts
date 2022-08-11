import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly service: RestaurantsService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.service.create(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('count')
  async restaurantCount():Promise<any> {
    let count = await this.service.findAll();
    return { count: count.length };
  }

  @Get('uid/:uuid')
  findOneByUUID(@Param('uuid') uuid: string) {
    return this.service.findOneByUuid(uuid);
  }

  @Get('check-slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.service.findOneBySlug(slug);
  }

  @Patch('/uid/:uuid')
  updateByUuid(@Param('uuid') uuid: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.service.updateByUuid(uuid, updateRestaurantDto);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.service.update(+id, updateRestaurantDto);
  }

  @Delete('/id/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }

  @Delete('uid/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeRestaurantsByUuid(@Param('uuid') uuid: string) {
    return this.service.removeRestaurantsByUuid(uuid);
  }

  // @Delete('/uuid/:uuid')
  // removeRestaurantById(@Param('uuid') uuid: string) {
  //   return this.restaurantsService.remove(uuid);
  // }

  @Post('delete_multiple')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeRestaurantsByUuids(@Body() uuids: string[]) {
    return this.service.removeRestaurantsByUuids(uuids);
  }

  @Delete('/util/delete_all')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAllRestaurant(@Body() uuids: string[]) {
    return this.service.removeAllRestaurants();
  }
}
