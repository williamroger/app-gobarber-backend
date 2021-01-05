import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateService = new AuthenticateUserService();

    const { user, token } = await authenticateService.execute({
      email,
      password,
    });

    //@ts-expect-error
    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default sessionRouter;
