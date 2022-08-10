import { Test, TestingModule } from '@nestjs/testing';
import { HelloworldRestCrudService } from './helloworld_rest_crud.service';

describe('HelloworldRestCrudService', () => {
  let service: HelloworldRestCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloworldRestCrudService],
    }).compile();

    service = module.get<HelloworldRestCrudService>(HelloworldRestCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
