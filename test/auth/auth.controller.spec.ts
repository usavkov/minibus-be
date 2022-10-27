import { AuthController } from '../../src/modules/auth';
import { getAuthModuleMock } from '../helpers';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module = await getAuthModuleMock();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
