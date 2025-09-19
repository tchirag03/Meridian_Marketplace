import Product from '../models/products.model.js';
import Store from '../models/store.model.js';
import mongoose from 'mongoose';

export const getProductsByStore = async (req, res) => {
    try {
        const {storeId}  = req.query;

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

export const getTotalProducts = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        res.status(200).json({ totalProducts });
    } catch (error) {
        console.error('Error getting total products:', error);
        res.status(500).send('Server Error');
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const productsByCategory = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $project: {
                    _id: 0,
                    category: '$category.name',
                    count: 1
                }
            }
        ]);
        const categories = productsByCategory.reduce((acc, category) => {
            acc[category.category] = category.count;
            return acc;
        }, {});
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error getting products by category:', error);
        res.status(500).send('Server Error');
    }
};



export const createProduct = async (req, res) => {
    try {
        // 1. Get product details from the request body
        const { name, description, category, price, stock } = req.body;

        // 2. Find the vendor's store using their authenticated ID
        const store = await Store.findOne({ owner: req.user.id });
        if (!store) {
            return res.status(403).json({ message: 'You must own a store to create a product.' });
        }

        // 3. Check for uploaded images
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'You must upload at least one product image.' });
        }

        // 4. Get the image URLs from Cloudinary (provided by multer)
        const imageUrls = req.files.map(file => file.path);

        // 5. Create the new product
        const newProduct = new Product({
            store: store._id,
            name,
            description,
            category,
            price,
            stock,
            imageUrls,
        });

        await newProduct.save();

        // 6. Optional but good practice: Add product reference to the store
        store.products.push(newProduct._id);
        await store.save();

        // 7. Send a success response
        res.status(201).json({ message: 'Product created successfully!', product: newProduct });

    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Server Error');
    }
};
