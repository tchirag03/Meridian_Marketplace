const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    keywords: [{
        type: String,
        trim: true
    }],
    category:{
        type: Schema.Types.ObjectId,
        ref : "storeCategory",
    },
    logoUrl: {
      type: String,
    },
    bannerUrl: {
      type: String,
    },
    location: {
      city: { type: String, default: "Bengaluru" },
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    rating: {
        type: Number,
        // required: true,
        min: 1,
        max: 5
    },
  },
  { timestamps: true }
);



storeSchema.pre('save', function(next) {
    if (this.isModified('storeName') || this.isModified('description')) {
        const textToProcess = `${this.storeName} ${this.description}`;
        this.keywords = generateKeywords(textToProcess);
    }
    next();
});

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
