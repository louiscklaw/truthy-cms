import { Test, TestingModule } from '@nestjs/testing';
import { HelloworldRestCrudController } from './helloworld_rest_crud.controller';
import { HelloworldRestCrudService } from './helloworld_rest_crud.service';

describe('HelloworldRestCrudController', () => {
  let controller: HelloworldRestCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelloworldRestCrudController],
      providers: [HelloworldRestCrudService],
    }).compile();

    controller = module.get<HelloworldRestCrudController>(HelloworldRestCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
