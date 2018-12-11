import { PhotoShopModule } from './photo-shop.module';

describe('PhotoShopModule', () => {
  let photoShopModule: PhotoShopModule;

  beforeEach(() => {
    photoShopModule = new PhotoShopModule();
  });

  it('should create an instance', () => {
    expect(photoShopModule).toBeTruthy();
  });
});
