import { PhotoShopRoutingModule } from './photo-shop-routing.module';

describe('PhotoShopRoutingModule', () => {
  let photoShopRoutingModule: PhotoShopRoutingModule;

  beforeEach(() => {
    photoShopRoutingModule = new PhotoShopRoutingModule();
  });

  it('should create an instance', () => {
    expect(photoShopRoutingModule).toBeTruthy();
  });
});
