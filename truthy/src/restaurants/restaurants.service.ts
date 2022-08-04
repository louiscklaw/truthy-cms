import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantEntity } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private restaurantRepository: Repository<RestaurantEntity>,
  );

  async create(createRestaurantDto: CreateRestaurantDto): Promise<any> {
    let { id } = await this.restaurantRepository.save(createRestaurantDto);
    return { ...createRestaurantDto, id };
  }

  async findAll(): Promise<RestaurantEntity[]> {
    return this.restaurantRepository.find();
    // return `This action returns all restaurants`;
  }

  findOne(id: number) {
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
  }
}
