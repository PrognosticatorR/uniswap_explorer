import { Router } from 'express';
import { expressjwt as jwt } from 'express-jwt';
import { config } from '../configs.js';
import { web3Controller } from '../controllers/web3Controller.js';
export const web3Router = Router();

/** GET /api/ */
web3Router.route('/').get(jwt(config), async (req, res) => {
  try {
    const { page = 1, offset = 1100 } = req.body;
    const result = await web3Controller.getTransactionLogsUsingEtherscan(page, offset);
    console.log(result.length);
    res.json(result);
  } catch (error) {
    res.send({ status: 400, error: error.message });
  }
});
