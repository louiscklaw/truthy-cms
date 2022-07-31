import { Test, TestingModule } from '@nestjs/testing';
import { MenyServiceTypeService } from './meny_service_type.service';

describe('MenyServiceTypeService', () => {
  let service: MenyServiceTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenyServiceTypeService],
    }).compile();

    service = module.get<MenyServiceTypeService>(MenyServiceTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
