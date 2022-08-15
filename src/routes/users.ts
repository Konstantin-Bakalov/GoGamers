import { Router } from 'express';
import auth from '../middlewares/auth-middleware';
import userService from '../services/user-service';

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

usersRouter.post('/', async (request, response) => {
  const { username, password, age } = request.body;

  const user = await userService.register(username, password, age);
  console.log(user);

  response.status(201).json(user);
});

export default usersRouter;
