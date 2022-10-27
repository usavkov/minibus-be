import { AuthService } from '../../src/modules/auth';
import { getAuthModuleMock } from '../helpers';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await getAuthModuleMock();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
