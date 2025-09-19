import Order from '../models/order.model.js';
import Product from '../models/products.model.js';
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

export const getTotalOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        res.status(200).json({ totalOrders });
    } catch (error) {
        console.error('Error getting total orders:', error);
        res.status(500).send('Server Error');
    }
};

export const getTotalRevenue = async (req, res) => {
    try {
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
        ]);
        res.status(200).json({ totalRevenue: totalRevenue[0]?.totalRevenue || 0 });
    } catch (error) {
        console.error('Error getting total revenue:', error);
        res.status(500).send('Server Error');
    }
};

export const getOrdersByStatus = async (req, res) => {
    try {
        const ordersByStatus = await Order.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        const statuses = ordersByStatus.reduce((acc, status) => {
            acc[status._id] = status.count;
            return acc;
        }, {});
        res.status(200).json(statuses);
    } catch (error) {
        console.error('Error getting orders by status:', error);
        res.status(500).send('Server Error');
    }
};

export const getRevenueByMonth = async (req, res) => {
    try {
        const revenueByMonth = await Order.aggregate([
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    revenue: { $sum: '$totalAmount' }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        res.status(200).json(revenueByMonth);
    } catch (error) {
        console.error('Error getting revenue by month:', error);
        res.status(500).send('Server Error');
    }
};

export const getOrderTrends = async (req, res) => {
    try {
        const orderTrends = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                    orders: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        res.status(200).json(orderTrends);
    } catch (error) {
        console.error('Error getting order trends:', error);
        res.status(500).send('Server Error');
    }
};

export const getAverageOrderValue = async (req, res) => {
    try {
        const averageOrderValue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    averageOrderValue: { $avg: '$totalAmount' }
                }
            }
        ]);
        res.status(200).json({ averageOrderValue: averageOrderValue[0]?.averageOrderValue || 0 });
    } catch (error) {
        console.error('Error getting average order value:', error);
        res.status(500).send('Server Error');
    }
};
