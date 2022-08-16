import { Router } from 'express';
import { ZodError } from 'zod';
import { requestHandler } from '../lib/request-handler';
import auth from '../middlewares/auth-middleware';
import userService, { RegisterInputSchema } from '../services/user-service';
import userTransformer from '../transformers/user-transformer';

const usersRouter = Router();

usersRouter.get('/', auth, async (request, response) => {
  const users = await userService.listAll();

  response.status(200).json(users);
});

usersRouter.get('/:id', auth, async (request, response) => {
  const userId = Number.parseInt(request.params.id);

  if (!Number.isNaN(userId)) {
    try {
      const user = await userService.getUser(Number(userId));
      response.status(200).json(user);
    } catch (error) {
      response.status(404).json({ error: 'User not found' });
    }
  } else {
    response.status(404).json({ error: 'User id must be a number' });
  }
});

usersRouter.post(
  '/',
  requestHandler(async (request, response) => {
    const input = RegisterInputSchema.parse(request.body);

    const user = await userService.register(input);

    response.status(201).json(userTransformer.transform(user));
  })
);

export default usersRouter;
