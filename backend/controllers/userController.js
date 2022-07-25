import { UserModel } from '../models/user.model.js';

export class UserController {
  async find(req, res, next) {
    try {
      // If a query string ?publicAddress=... is given, then filter results
      const whereClause = req.query && req.query.publicAddress ? { publicAddress: req.query.publicAddress } : undefined;
      const users = await UserModel.find(whereClause);
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      // AccessToken payload is in req.user.payload, especially its `id` field
      // UserModelId is the param in /users/:userId
      // We only allow user accessing herself, i.e. require payload.id==userId
      console.log(req.user, req.params);
      if (req.user.payload.id !== +req.params.userId) {
        return res.status(401).send({ error: 'You can can only access yourself' });
      }
      const user = await UserModel.findById(req.params.userId);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const user = await UserModel.create(req.body);
      await user.save();
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async patch(req, res, next) {
    try {
      // Only allow to fetch current user
      if (req.user.payload.id !== +req.params.userId) {
        return res.status(401).send({ error: 'You can can only access yourself' });
      }
      const user = await UserModel.findById(req.params.userId);
      if (!user) {
        return user;
      }
      Object.assign(user, req.body);
      await user.save();
      return user
        ? res.json(user)
        : res.status(401).send({
            error: `UserModel with publicAddress ${req.params.userId} is not found in database`
          });
    } catch (error) {
      next(error);
    }
  }
}
