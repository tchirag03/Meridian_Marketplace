const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
}, { timestamps: true });

const Category = mongoose.model('storeCategory', categorySchema);
module.exports = Category;