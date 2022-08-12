import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortcutsController } from './url-shortcuts.controller';
import { UrlShortcutsService } from './url-shortcuts.service';

describe('UrlShortcutsController', () => {
  let controller: UrlShortcutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlShortcutsController],
      providers: [UrlShortcutsService],
    }).compile();

    controller = module.get<UrlShortcutsController>(UrlShortcutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
