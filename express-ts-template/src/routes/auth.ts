import { Router } from 'express';
import { login, getCurrentUser } from '../controllers/auth';

const router = Router();

router.post('/login', login);
router.get('/current', getCurrentUser);

export default router;
