import { TrunkRoutingModule } from './trunk-routing.module';

describe('TrunkRoutingModule', () => {
  let trunkRoutingModule: TrunkRoutingModule;

  beforeEach(() => {
    trunkRoutingModule = new TrunkRoutingModule();
  });

  it('should create an instance', () => {
    expect(trunkRoutingModule).toBeTruthy();
  });
});
