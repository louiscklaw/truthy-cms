import { Injectable } from '@nestjs/common';
import { CreateFoodMenuDto } from './dto/create-food-menu.dto';
import { UpdateFoodMenuDto } from './dto/update-food-menu.dto';

@Injectable()
export class FoodMenuService {
  create(createFoodMenuDto: CreateFoodMenuDto) {
    return 'This action adds a new foodMenu';
  }

  findAll() {
    return `This action returns all foodMenu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodMenu`;
  }

  update(id: number, updateFoodMenuDto: UpdateFoodMenuDto) {
    return `This action updates a #${id} foodMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodMenu`;
  }
}
