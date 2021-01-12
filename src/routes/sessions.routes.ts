import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateService = new AuthenticateUserService();

  const { user, token } = await authenticateService.execute({
    email,
    password,
  });

  //@ts-expect-error
  delete user.password;

  return response.json({ user, token });
})

export default sessionRouter;
