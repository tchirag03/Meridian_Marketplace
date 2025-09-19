import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingBag } from 'lucide-react';

const FAKE_STORE_API_BASE_URL = 'https://fakestoreapi.com';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary mx-auto"></div>
      <p className="mt-4 text-lg text-text-color opacity-80">Loading products...</p>
    </div>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col">
    <img
      src={product.image}
      alt={product.title}
      className="w-full h-40 object-contain rounded-lg mb-4"
    />
    <h2 className="text-lg font-semibold text-primary flex-grow">
      {product.title}
    </h2>
    <p className="text-sm text-gray-600">Category: {product.category}</p>
    <p className="text-lg font-bold text-text-color mt-2">${product.price.toFixed(2)}</p>
    <button className="mt-4 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center">
      <ShoppingBag className="h-5 w-5 mr-2" /> Add to Cart
    </button>
  </div>
);

const Buyer = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        // Fetch all products
        const productsResponse = await axios.get(`${FAKE_STORE_API_BASE_URL}/products`);
        setProducts(productsResponse.data);

        // Fetch categories
        const categoriesResponse = await axios.get(`${FAKE_STORE_API_BASE_URL}/products/categories`);
        setCategories(['all', ...categoriesResponse.data]);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-background">
        <main className="pt-20 px-6 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-text-color mb-6">
            Explore Products
          </h1>

          {/* Categories Section */}
          <div className="mb-8 p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-text-color mb-4">Shop by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition 
                    ${selectedCategory === category 
                      ? 'bg-primary text-slate-500 shadow-md' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Buyer;
