import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';


const scheduleOrderCompletion = (orderId) => {
    setTimeout(async () => {
        try {
            const updatedOrder = await Order.findOneAndUpdate(
                { _id: orderId, status: 'Processing' },
                { status: 'Completed' },
                { new: true }
            );

            if (updatedOrder) {
                console.log(`✅ Order ${orderId} status automatically updated to Completed.`);
            }
        } catch (error) {
            console.error(`❌ Failed to auto-update order ${orderId}:`, error);
        }
    }, 3 * 60 * 1000);
};


export const createBuyNowOrder = async (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id;

    try {
        const product = await Product.findById(productId);
        if (!product || product.stock < quantity) {
            return res.status(400).json({ message: 'Product not found or out of stock.' });
        }
        
        const user = await User.findById(userId);
        if (!user.address || !user.address.street) {
            return res.status(400).json({ message: 'Please add a shipping address.' });
        }
        
        const newOrder = new Order({
            buyer: userId,
            items: [{ product: productId, store: product.store, quantity, price: product.price }],
            totalAmount: product.price * quantity,
            shippingAddress: user.address,
            status: 'Processing',
            paymentDetails: { paymentMethod: 'Hackathon Mock Payment', status: 'Paid' }
        });

        await newOrder.save();
        
        product.stock -= quantity;
        await product.save();
        
        scheduleOrderCompletion(newOrder._id);
        
        res.status(201).json({
            message: 'Order placed successfully! It will be marked as completed in 3 minutes.',
            order: newOrder,
        });

    } catch (error) {
        console.error('Error creating Buy Now order:', error);
        res.status(500).send('Server Error');
    }
};