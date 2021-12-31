import { Router } from 'express';

import auth from '../../api/routes/route.auth';
import category from '../../api/routes/route.category';
import product from '../../api/routes/route.product';

const api = Router();

api.use('/auth', auth);
api.use('/category', category);
api.use('/product', product);

export default api;
