import { Router } from 'express';

import auth from '../../api/routes/route.auth';

const api = Router();

api.use('/auth', auth);

export default api;
