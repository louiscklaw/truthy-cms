import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantEntity } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private restaurantRepository: Repository<RestaurantEntity>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<any> {
    return await this.restaurantRepository.save(createRestaurantDto);
  }

  async findAll(): Promise<RestaurantEntity[]> {
    return this.restaurantRepository.find({ relations: ['meny_service_types'] });
    // return `This action returns all restaurants`;
  }
  // findOneByUuid
  findOneByUuid(uuid: string) {
    return this.restaurantRepository.findOneOrFail({ uuid });
    // return `This action returns a #${id} restaurant`;
  }

  // updateByUuid
  async updateByUuid(uuid: string, updateRestaurantDto: UpdateRestaurantDto): Promise<any> {
    console.log({ uuid });
    // return `This action updates a #${uuid} restaurant`;
    let result = await this.restaurantRepository.update({ uuid }, updateRestaurantDto);
    return result;
  }

  findOne(id: number) {
    return this.restaurantRepository.findOne(+id);
    return `This action returns a #${id} restaurant`;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<any> {
    // return `This action updates a #${id} restaurant`;
    let result = await this.restaurantRepository.update(id, updateRestaurantDto);
    return result;
  }

  async remove(id: number): Promise<void> {
    // return `This action removes a #${id} restaurant`;
    await this.restaurantRepository.delete(id);
    return;
  }

  // removeRestaurantsByUuid

  async removeRestaurantsByUuid(uuid: string): Promise<void> {
    // return `This action removes a #${id} restaurant`;
    await this.restaurantRepository.delete({ uuid });
  }

  async removeRestaurantsByUuids(uuids: string[]): Promise<void> {
    // return `This action removes a #${id} restaurant`;
    for (let i = 0; i < uuids.length; i++) {
      let uuid = uuids[i];
      await this.restaurantRepository.delete({ uuid });
    }
  }
}
