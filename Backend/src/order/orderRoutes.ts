import express from 'express';
import { deliverOrder } from './orderController';

const router = express.Router();

router.post('/deliverOrder', deliverOrder);

export default router;