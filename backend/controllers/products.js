import Product from '../models/products.model.js';
import Store from '../models/store.model.js';
import mongoose from 'mongoose';

export const getProductsByStore = async (req, res) => {
    try {
        const { storeId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(storeId)) {
            return res.status(400).json({ message: 'Invalid Store ID format.' });
        }

        const store = await Store.findById(storeId);
        if (!store || !store.isActive) {
            return res.status(404).json({ message: 'Store not found or is inactive.' });
        }

        const products = await Product.find({ store: storeId })
            .populate('category', 'name')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            message: `Found ${products.length} products for store '${store.storeName}'`,
            data: products,
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};



