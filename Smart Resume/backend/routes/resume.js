import express from 'express';
import { saveResume, getResume } from '../controllers/resumeController.js';

const router = express.Router();

router.post('/', saveResume);
router.get('/:id', getResume);

export default router;
