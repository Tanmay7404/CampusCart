import express from 'express';
import { getOrdersForShopkeeper } from './orderController';

const router = express.Router();

// router.post('/deliverOrder', deliverOrder);

router.get('/shopkeeper/:shopkeeperId/orders', getOrdersForShopkeeper);

export default router;