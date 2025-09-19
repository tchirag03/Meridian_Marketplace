import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, TrendingUp, Globe, ShoppingBag } from 'lucide-react';

const OPEN_EXCHANGE_RATES_API_KEY = 'https://openexchangerates.org/api/latest.json?app_id=200ccee32b074280ac0b98f74e440585&base=GBP&callback=someCallbackFunction'; // Replace with your actual API key
const FAKE_STORE_API_BASE_URL = 'https://fakestoreapi.com';

const DashboardHeader = ({ title, description }) => (
  <div className="mb-8">
    <h1 className="text-3xl md:text-4xl font-bold text-text-color mb-2">{title}</h1>
    <p className="text-lg text-text-color opacity-80">{description}</p>
  </div>
);

const MetricCard = ({ title, value, icon, iconColorClass }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transition-transform duration-300 hover:scale-105">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-text-color mt-1">{value}</p>
    </div>
    <div className={`h-12 w-12 flex items-center justify-center rounded-full ${iconColorClass} bg-opacity-20`}>
      {React.cloneElement(icon, { className: "h-6 w-6" })}
    </div>
  </div>
);

const ProductCard = ({ product, rates, targetCurrency }) => {
  const convertedPrice = (product.price * rates[targetCurrency]).toFixed(2);
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col h-full">
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
      <h3 className="font-semibold text-text-color text-lg mb-2 flex-grow">{product.title}</h3>
      <p className="text-gray-600 text-sm mb-1">Category: {product.category}</p>
      <p className="text-text-color font-bold text-xl mb-2">${product.price.toFixed(2)} USD</p>
      {targetCurrency && rates[targetCurrency] && targetCurrency !== 'USD' && (
        <p className="text-secondary font-bold text-lg">{convertedPrice} {targetCurrency}</p>
      )}
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary mx-auto"></div>
      <p className="mt-4 text-lg text-text-color opacity-80">Loading data...</p>
    </div>
  </div>
);

function EcommerceDashboard() {
  const [loading, setLoading] = useState(true);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch exchange rates
        const ratesResponse = await axios.get(`https://open.er-api.com/v6/latest/USD?apikey=${OPEN_EXCHANGE_RATES_API_KEY}`);
        setExchangeRates(ratesResponse.data.rates);

        // Fetch products
        const productsResponse = await axios.get(`${FAKE_STORE_API_BASE_URL}/products`);
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);

        // Extract categories
        const uniqueCategories = [...new Set(productsResponse.data.map(p => p.category))];
        setCategories(['all', ...uniqueCategories]);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let currentProducts = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      currentProducts = currentProducts.filter(p => p.category === selectedCategory);
    }

    // Sort products
    currentProducts.sort((a, b) => {
      const priceA = targetCurrency === 'USD' ? a.price : a.price * (exchangeRates[targetCurrency] || 1);
      const priceB = targetCurrency === 'USD' ? b.price : b.price * (exchangeRates[targetCurrency] || 1);

      if (sortOrder === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    setFilteredProducts(currentProducts);
  }, [products, selectedCategory, targetCurrency, sortOrder, exchangeRates]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!exchangeRates || !products.length) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-text-color">Failed to load data. Please check API keys and network.</div>;
  }

  const availableCurrencies = Object.keys(exchangeRates).filter(currency => currency !== 'USD').slice(0, 5); // Limit to 5 for display

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader 
          title="E-commerce Product Pricing & Economic Indicators"
          description="Analyze product prices across different currencies and market trends."
        />

        {/* Exchange Rates Overview */}
        <h2 className="text-2xl font-bold text-text-color mb-4">Current Exchange Rates (vs. USD)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {availableCurrencies.map(currency => (
            <MetricCard 
              key={currency}
              title={`1 USD to ${currency}`}
              value={exchangeRates[currency].toFixed(4)}
              icon={<Globe />}
              iconColorClass="text-primary bg-primary"
            />
          ))}
        </div>

        {/* Product Filters and Sort */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="category-select" className="text-text-color font-medium">Category:</label>
            <select 
              id="category-select"
              className="p-2 border border-gray-300 rounded-md bg-white text-text-color"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="currency-select" className="text-text-color font-medium">Convert to:</label>
            <select 
              id="currency-select"
              className="p-2 border border-gray-300 rounded-md bg-white text-text-color"
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            >
              {Object.keys(exchangeRates).map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-text-color font-medium">Sort Price:</label>
            <select 
              id="sort-select"
              className="p-2 border border-gray-300 rounded-md bg-white text-text-color"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Listings */}
        <h2 className="text-2xl font-bold text-text-color mb-4">Product Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              rates={exchangeRates}
              targetCurrency={targetCurrency}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EcommerceDashboard;
