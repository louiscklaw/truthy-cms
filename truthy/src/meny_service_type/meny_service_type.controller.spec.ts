import { Test, TestingModule } from '@nestjs/testing';
import { MenyServiceTypeController } from './meny_service_type.controller';
import { MenyServiceTypeService } from './meny_service_type.service';

describe('MenyServiceTypeController', () => {
  let controller: MenyServiceTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenyServiceTypeController],
      providers: [MenyServiceTypeService],
    }).compile();

    controller = module.get<MenyServiceTypeController>(MenyServiceTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
