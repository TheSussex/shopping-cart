import { Router } from 'express';

import auth from '../../api/routes/route.auth';
import category from '../../api/routes/route.category';
import product from '../../api/routes/route.product';
import cart from '../../api/routes/route.cart';
const api = Router();

api.use('/auth', auth);
api.use('/category', category);
api.use('/product', product);
api.use('/cart', cart);

export default api;
