import { Test, TestingModule } from '@nestjs/testing';
import { FoodMenuController } from './food-menu.controller';
import { FoodMenuService } from './food-menu.service';

describe('FoodMenuController', () => {
  let controller: FoodMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodMenuController],
      providers: [FoodMenuService],
    }).compile();

    controller = module.get<FoodMenuController>(FoodMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
