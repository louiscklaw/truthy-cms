import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenyServiceTypeEntity } from 'src/meny_service_type/entities/meny_service_type.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantEntity } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private repository: Repository<RestaurantEntity>,
    @InjectRepository(MenyServiceTypeEntity)
    private menyServiceTypeRepository: Repository<MenyServiceTypeEntity>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<any> {
    return await this.repository.save(createRestaurantDto);
  }

  async findAll(): Promise<RestaurantEntity[]> {
    return this.repository.find({ relations: ['meny_service_types'] });
    // return `This action returns all restaurants`;
  }
  // findOneByUuid
  findOneByUuid(uuid: string) {
    return this.repository.findOneOrFail({ uuid }, { relations: ['meny_service_types'] });
    // return `This action returns a #${id} restaurant`;
  }

  async findIdByUuid(uuid: string) {
    return await this.repository.findOne({ uuid });
  }

  // updateByUuid
  async updateByUuid(uuid: string, updateRestaurantDto: UpdateRestaurantDto): Promise<any> {
    try {
      console.log({ uuid });
      // return `This action updates a #${uuid} restaurant`;

      let { id } = await this.findIdByUuid(uuid);

      let result = await this.repository.save({ ...updateRestaurantDto, id });
      return result;
    } catch (error) {}
  }

  findOne(id: number) {
    return this.repository.findOne(+id);
    return `This action returns a #${id} restaurant`;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<any> {
    // return `This action updates a #${id} restaurant`;
    return await this.repository.save({ ...updateRestaurantDto, id });
  }

  async remove(id: number): Promise<void> {
    // return `This action removes a #${id} restaurant`;
    await this.repository.delete(id);
    return;
  }

  // removeRestaurantsByUuid

  async removeRestaurantsByUuid(uuid: string): Promise<void> {
    // return `This action removes a #${id} restaurant`;
    await this.repository.delete({ uuid });
  }

  async removeRestaurantsByUuids(uuids: string[]): Promise<void> {
    // return `This action removes a #${id} restaurant`;
    for (let i = 0; i < uuids.length; i++) {
      let uuid = uuids[i];
      await this.repository.delete({ uuid });
    }
  }

  async removeAllRestaurants() {
    try {
      for (let i = 0; i < 999; i++) {
        await this.repository.delete(i);
      }
    } catch (error) {}
  }
}
