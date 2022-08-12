import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortcutsService } from './url-shortcuts.service';

describe('UrlShortcutsService', () => {
  let service: UrlShortcutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlShortcutsService],
    }).compile();

    service = module.get<UrlShortcutsService>(UrlShortcutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
