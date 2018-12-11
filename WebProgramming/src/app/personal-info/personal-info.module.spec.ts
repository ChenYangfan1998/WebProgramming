import { PersonalInfoModule } from './personal-info.module';

describe('PersonalInfoModule', () => {
  let personalInfoModule: PersonalInfoModule;

  beforeEach(() => {
    personalInfoModule = new PersonalInfoModule();
  });

  it('should create an instance', () => {
    expect(personalInfoModule).toBeTruthy();
  });
});
