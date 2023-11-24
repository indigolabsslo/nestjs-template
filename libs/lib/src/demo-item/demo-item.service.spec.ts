import { Test, TestingModule } from '@nestjs/testing';
import { DemoItemService } from './demo-item.service';

describe('DemoItemService', () => {
  let service: DemoItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemoItemService],
    }).compile();

    service = module.get<DemoItemService>(DemoItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
