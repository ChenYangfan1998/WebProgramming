import { TrunkModule } from './trunk.module';

describe('TrunkModule', () => {
  let trunkModule: TrunkModule;

  beforeEach(() => {
    trunkModule = new TrunkModule();
  });

  it('should create an instance', () => {
    expect(trunkModule).toBeTruthy();
  });
});
