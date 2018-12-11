import { PersonalInfoRoutingModule } from './personal-info-routing.module';

describe('PersonalInfoRoutingModule', () => {
  let personalInfoRoutingModule: PersonalInfoRoutingModule;

  beforeEach(() => {
    personalInfoRoutingModule = new PersonalInfoRoutingModule();
  });

  it('should create an instance', () => {
    expect(personalInfoRoutingModule).toBeTruthy();
  });
});
