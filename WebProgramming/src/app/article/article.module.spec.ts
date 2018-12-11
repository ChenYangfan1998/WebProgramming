import { ArticleModule } from './article.module';

describe('ArticleModel', () => {
  let articleModule: ArticleModule;

  beforeEach(() => {
    articleModule = new ArticleModule();
  });

  it('should create an instance', () => {
    expect(articleModule).toBeTruthy();
  });
});
