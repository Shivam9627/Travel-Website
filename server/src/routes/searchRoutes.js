import express from 'express';
import { searchDestinations } from '../controllers/searchController.js';

const router = express.Router();

// GET /api/search?query=destination_name
router.get('/', searchDestinations);

export default router;
