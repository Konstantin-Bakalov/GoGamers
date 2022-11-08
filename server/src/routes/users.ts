import { Router } from 'express';
import { requestHandler } from '../lib/request-handler';
import auth from '../middlewares/auth-middleware';
import userService from '../services/user-service';
import { UserTransformer } from '../transformers/user-transformer';

const usersRouter = Router();

const transformer = new UserTransformer();

usersRouter.get('/', auth, async (request, response) => {
    const users = await userService.listAll();

    response.status(200).json(transformer.transformArray(users));
});

// usersRouter.get('/:id', auth, async (request, response) => {
//     const userId = Number.parseInt(request.params.id);

//     if (!Number.isNaN(userId)) {
//         try {
//             const user = await userService.getUser(Number(userId));
//             response.status(200).json(transformer.transform(user));
//         } catch (error) {
//             response.status(404).json({ error: 'User not found' });
//         }
//     } else {
//         response.status(404).json({ error: 'User id must be a number' });
//     }
// });

export default usersRouter;
