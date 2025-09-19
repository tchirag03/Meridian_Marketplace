import User from '../models/user.model.js';
import Store from '../models/store.model.js';
import Product from '../models/products.model.js';
import Order from '../models/order.model.js';
import Category from '../models/category.model.js';
import Review from '../models/review.model.js';

export const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error getting total users:', error);
        res.status(500).send('Server Error');
    }
};

export const getUsersByRole = async (req, res) => {
    try {
        const usersByRole = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);
        const roles = usersByRole.reduce((acc, role) => {
            acc[role._id] = role.count;
            return acc;
        }, {});
        res.status(200).json(roles);
    } catch (error) {
        console.error('Error getting users by role:', error);
        res.status(500).send('Server Error');
    }
};

export const getDashboardSummary = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalStores = await Store.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        const totalRevenueResult = await Order.aggregate([
            { $match: { status: 'Delivered' } }, // Only count delivered orders for revenue
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);
        const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

        const usersByRole = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);
        const roles = usersByRole.reduce((acc, role) => {
            acc[role._id] = role.count;
            return acc;
        }, { buyers: 0, sellers: 0 });

        const ordersByStatus = await Order.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        const orderStatus = ordersByStatus.reduce((acc, status) => {
            acc[status._id] = status.count;
            return acc;
        }, {});

        const productsByCategory = await Product.aggregate([
            { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'categoryDetails' } },
            { $unwind: '$categoryDetails' },
            { $group: { _id: '$categoryDetails.name', count: { $sum: 1 } } }
        ]);
        const productCategories = productsByCategory.reduce((acc, cat) => {
            acc[cat._id] = cat.count;
            return acc;
        }, {});

        // Revenue by Month (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const revenueByMonth = await Order.aggregate([
            { $match: { status: 'Delivered', createdAt: { $gte: sixMonthsAgo } } },
            { $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                revenue: { $sum: '$totalAmount' }
            }},
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedRevenueByMonth = revenueByMonth.map(item => ({
            month: monthNames[item._id.month - 1],
            revenue: item.revenue
        }));

        // Order Trends (last 6 months)
        const orderTrends = await Order.aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            { $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' }, day: { $dayOfMonth: '$createdAt' } },
                orders: { $sum: 1 }
            }},
            { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
        ]);

        const formattedOrderTrends = orderTrends.map(item => ({
            date: `${item._id.year}-${item._id.month}-${item._id.day}`,
            orders: item.orders
        }));

        // Top Rated Stores (assuming 'rating' field exists in Store model)
        const topRatedStores = await Store.find({ rating: { $exists: true } })
                                        .sort({ rating: -1, storeName: 1 })
                                        .limit(5)
                                        .select('storeName rating products'); // Include products to count orders
        
        const topStoresWithOrderCount = await Promise.all(topRatedStores.map(async store => {
            const ordersCount = await Order.countDocuments({ 'items.store': store._id });
            return { name: store.storeName, rating: store.rating, orders: ordersCount };
        }));

        const averageOrderValueResult = await Order.aggregate([
            { $match: { status: 'Delivered' } },
            { $group: { _id: null, average: { $avg: '$totalAmount' } } }
        ]);
        const averageOrderValue = averageOrderValueResult.length > 0 ? averageOrderValueResult[0].average : 0;

        res.status(200).json({
            totalUsers,
            totalStores,
            totalProducts,
            totalOrders,
            totalRevenue,
            usersByRole: roles,
            ordersByStatus: orderStatus,
            productsByCategory: productCategories,
            revenueByMonth: formattedRevenueByMonth,
            orderTrends: formattedOrderTrends,
            topRatedStores: topStoresWithOrderCount,
            averageOrderValue: parseFloat(averageOrderValue.toFixed(2)),
        });

    } catch (error) {
        console.error('Error fetching dashboard summary:', error);
        res.status(500).send('Server Error');
    }
};
