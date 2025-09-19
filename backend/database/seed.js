// scripts/seed.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import  { dbConnect }  from "./dbConnect.js"; // your dbConnect
import User from "../models/user.model.js";
import Store from "../models/store.model.js";
import Product from "../models/products.model.js";
import Category from "../models/category.model.js";
import Review from "../models/review.model.js";

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const seedDatabase = async () => {
  try {
    await dbConnect();

    console.log("Clearing collections...");
    await Promise.all([
      User.deleteMany({}),
      Store.deleteMany({}),
      Product.deleteMany({}),
      Category.deleteMany({}),
      Review.deleteMany({}),
    ]);

    // 1) Categories
    const categoriesData = [
      { name: "Electronics", description: "Gadgets, accessories and devices." },
      { name: "Books", description: "Fiction, non-fiction, textbooks and more." },
      { name: "Clothing", description: "Men's, women's and children's apparel." },
      { name: "Home & Kitchen", description: "Essentials and decor for home." },
      { name: "Sports & Outdoors", description: "Fitness and outdoor gear." },
    ];
    const categories = await Category.insertMany(categoriesData);
    console.log(`Created ${categories.length} categories.`);

    // 2) Users (mix of sellers and buyers)
    const rawUsers = [
      { name: "Ananya Seller", email: "ananya@sellers.example", password: "12345", role: "seller", location: "Bengaluru" },
      { name: "Ravi Seller", email: "ravi@sellers.example", password: "12345", role: "seller", location: "Bengaluru" },
      { name: "Priya Seller", email: "priya@sellers.example", password: "12345", role: "seller", location: "Mysuru" },
      { name: "Vikram Seller", email: "vikram@sellers.example", password: "12345", role: "seller", location: "Delhi" },
      { name: "Chirag Buyer", email: "chirag@example.com", password: "12345", role: "buyer", location: "Bengaluru" },
      { name: "Maya Buyer", email: "maya@example.com", password: "12345", role: "buyer", location: "Pune" },
      { name: "Arjun Buyer", email: "arjun@example.com", password: "12345", role: "buyer", location: "Chennai" },
      { name: "Neha Buyer", email: "neha@example.com", password: "12345", role: "buyer", location: "Hyderabad" },
    ];

    const usersToInsert = await Promise.all(
      rawUsers.map(async u => {
        const salt = await bcrypt.genSalt(10);
        return { ...u, password: await bcrypt.hash(u.password, salt) };
      })
    );
    const users = await User.insertMany(usersToInsert);
    console.log(`Created ${users.length} users (${users.filter(u => u.role==='seller').length} sellers).`);

    // helper product name generator
    const adjectives = ["Classic", "Pro", "Lite", "Smart", "Eco", "Deluxe", "Compact"];
    const nouns = ["Speaker", "T-shirt", "Mug", "Backpack", "Lamp", "Drill", "Notebook", "Yoga Mat", "Headphones", "Jacket"];

    // 3) Create stores (one per seller, but we can create multiple stores)
    const sellers = users.filter(u => u.role === "seller");
    const stores = [];
    for (let i = 0; i < 6; i++) {
      const owner = sellers[i % sellers.length];
      const storePayload = {
        owner: owner._id,
        storeName: `${owner.name.split(' ')[0]} Shop ${i + 1}`,
        description: `Handpicked items from ${owner.name}.`,
        category: categories[i % categories.length]._id,
        logoUrl: `https://picsum.photos/seed/store-${i}/200/200`,
        bannerUrl: `https://picsum.photos/seed/banner-${i}/1200/300`,
        location: { city: "Bengaluru" },
      };
      // Use create() so pre('save') runs (generateKeywords)
      const createdStore = await Store.create(storePayload);
      // update user's store field (use first store for user)
      await User.findByIdAndUpdate(owner._id, { store: createdStore._id });

      // create products for this store
      const productCount = randInt(8, 14);
      const productDocs = [];
      for (let j = 0; j < productCount; j++) {
        const name = `${sample(adjectives)} ${sample(nouns)}`;
        const price = Number((Math.random() * (2000 - 100) + 100).toFixed(2)); // 100 - 2000
        productDocs.push({
          store: createdStore._id,
          name,
          description: `${name} — quality guaranteed by ${createdStore.storeName}.`,
          category: sample(categories)._id,
          price,
          stock: randInt(0, 50),
          imageUrls: [`https://picsum.photos/seed/${createdStore._id}-${j}/600/400`],
          averageRating: 0,
          reviewCount: 0
        });
      }

      const createdProducts = await Product.insertMany(productDocs);
      const createdProductIds = createdProducts.map(p => p._id);

      // push product ids into store.products
      await Store.findByIdAndUpdate(createdStore._id, { $push: { products: { $each: createdProductIds } } });

      console.log(`Created store "${createdStore.storeName}" with ${createdProducts.length} products.`);
      stores.push(createdStore);
    }

    // 4) Create reviews for a subset of products
    const allProducts = await Product.find();
    const reviewDocs = [];
    // generate roughly 1-3 reviews for many products
    for (const product of shuffle(allProducts).slice(0, Math.floor(allProducts.length * 0.7))) {
      const reviewsForThis = randInt(0, 4);
      for (let r = 0; r < reviewsForThis; r++) {
        const rating = randInt(1, 5);
        const user = sample(users);
        reviewDocs.push({
          product: product._id,
          user: user._id,
          rating,
          comment: `Auto-generated review: ${rating} stars for ${product.name}`
        });
      }
    }
    const createdReviews = reviewDocs.length ? await Review.insertMany(reviewDocs) : [];
    console.log(`Created ${createdReviews.length} reviews.`);

    // 5) Recalculate averageRating & reviewCount per product
    if (createdReviews.length) {
      // group in JS (small dataset) then update
      const stats = {};
      for (const rev of createdReviews) {
        const pid = String(rev.product);
        stats[pid] = stats[pid] || { sum: 0, count: 0 };
        stats[pid].sum += rev.rating;
        stats[pid].count += 1;
      }
      const updatePromises = Object.entries(stats).map(([pid, s]) => {
        return Product.findByIdAndUpdate(pid, {
          averageRating: Number((s.sum / s.count).toFixed(2)),
          reviewCount: s.count
        });
      });
      await Promise.all(updatePromises);
      console.log("Updated product ratings from created reviews.");
    }

    console.log("Seeding finished successfully.");
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
