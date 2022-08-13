import { Router } from 'express';
import userService from '../services/user-service';

const loginRouter = Router();

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const userLogged = await userService.login(username, password);

  if (!userLogged) {
    response.status(401).json({ error: 'Unauthorized' });
    return;
  }
});

export default loginRouter;
