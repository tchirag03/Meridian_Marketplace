import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'seller'
    },
    location:{
        type:String,
    },
    phoneNumber: {
        type: String
    },
    // This links a vendor user to their specific store
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store'
    }
}, { timestamps: true });

const User = model('User', userSchema);
export default User;