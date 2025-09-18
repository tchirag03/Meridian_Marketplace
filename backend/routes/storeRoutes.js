import { Router } from 'express';
import { getAllStores, searchStores } from '../controllers/store.js';
import authMiddleware from "../middleware/authMiddleware.js"
import { getProductsByStore } from '../controllers/products.js';
const storeRouter = Router();

const router = express.Router();

router.get('/search', searchStores); //GET /api/stores/search

router.get('/', getAllStores); //GET /api/stores

router.get('/:storeId/products', getProductsByStore);

// Vendor Routes
router.get('/me', authMiddleware, getMyStore);
router.patch('/me', authMiddleware, updateMyStore);
router.patch('/me/image', authMiddleware, upload, uploadStoreImage);

export default storeRouter;