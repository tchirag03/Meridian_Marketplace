import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const orderItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: { // Price per item at the time of purchase
        type: Number,
        required: true
    }
});

const orderSchema = new Schema({
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentDetails: {
        paymentId: String,
        paymentMethod: String,
        status: {
            type: String,
            enum: ['Paid', 'Unpaid'],
            default: 'Unpaid'
        }
    }
}, { timestamps: true });

const Order = model('Order', orderSchema);
export default Order;