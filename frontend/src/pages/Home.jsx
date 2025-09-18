import React, { useState } from 'react';
import { ChevronRight, Globe, Users, ShoppingBag, Store, Sparkles, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate=useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleSellerClick = () => {
    // This will be redirected to seller page - placeholder for now
    console.log('Redirecting to seller page...');
    alert('Seller page - Coming soon! This will redirect to the seller dashboard.');
  };

  const handleBuyerClick = () => {
    // This will be redirected to buyer page - placeholder for now
    console.log('Redirecting to buyer page...');
    alert('Buyer page - Coming soon! This will redirect to the marketplace browse page.');
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-600" style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #00897B 100%)' }}></div>
        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                <Globe className="w-10 h-10" />
                <h1 className="text-3xl font-bold">GlobalCraft</h1>
              </div>
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Connecting Local Artisans
              <br />
              <span className="text-amber-300" style={{ color: '#FFB300' }}>With Global Markets</span>
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Empower authentic craftsmanship. Build trust across borders. 
              Make global commerce seamless for local businesses.
            </p>
            
            {/* Trust indicators */}
            <div className="flex justify-center space-x-8 mb-12">
              <div className="flex items-center space-x-2 text-sm opacity-80">
                <Shield className="w-5 h-5" />
                <span>Verified Authentic</span>
              </div>
              <div className="flex items-center space-x-2 text-sm opacity-80">
                <Users className="w-5 h-5" />
                <span>10k+ Artisans</span>
              </div>
              <div className="flex items-center space-x-2 text-sm opacity-80">
                <Globe className="w-5 h-5" />
                <span>Global Reach</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Sparkles className="w-16 h-16 text-amber-300" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Sparkles className="w-12 h-12 text-amber-300" />
        </div>
      </header>

      {/* Main Selection Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4" style={{ color: '#0D1B2A' }}>
            Choose Your Journey
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're creating beautiful products or seeking authentic craftsmanship, 
            we've built the perfect platform for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Seller Card */}
          <div 
            className={`relative group cursor-pointer transform transition-all duration-300 ${
              hoveredCard === 'seller' ? 'scale-105' : 'hover:scale-105'
            }`}
            onMouseEnter={() => setHoveredCard('seller')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handleSellerClick}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-200">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-blue-100 group-hover:bg-blue-500 transition-colors duration-300">
                  <Store className={`w-10 h-10 transition-colors duration-300 ${
                    hoveredCard === 'seller' ? 'text-white' : 'text-blue-600'
                  }`} style={{ color: hoveredCard === 'seller' ? 'white' : '#1E88E5' }} />
                </div>
                
                <h4 className="text-2xl font-bold mb-4" style={{ color: '#0D1B2A' }}>
                  I'm a Seller
                </h4>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Showcase your authentic products to a global audience. 
                  Build trust with verified reviews and seamless payment processing.
                </p>
                
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400" style={{ backgroundColor: '#FFB300' }}></div>
                    <span className="text-gray-700">Create your digital storefront</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400" style={{ backgroundColor: '#FFB300' }}></div>
                    <span className="text-gray-700">Reach customers worldwide</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400" style={{ backgroundColor: '#FFB300' }}></div>
                    <span className="text-gray-700">Secure payment processing</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400" style={{ backgroundColor: '#FFB300' }}></div>
                    <span className="text-gray-700">Marketing support & tools</span>
                  </li>
                </ul>
                
                <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors duration-300 group"
                  style={{ backgroundColor: '#1E88E5' }}>
                  <span>Start Selling</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Buyer Card */}
          <div 
            className={`relative group cursor-pointer transform transition-all duration-300 ${
              hoveredCard === 'buyer' ? 'scale-105' : 'hover:scale-105'
            }`}
            onMouseEnter={() => setHoveredCard('buyer')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handleBuyerClick}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-teal-200">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-teal-100 group-hover:bg-teal-600 transition-colors duration-300">
                  <ShoppingBag className={`w-10 h-10 transition-colors duration-300 ${
                    hoveredCard === 'buyer' ? 'text-white' : 'text-teal-600'
                  }`} style={{ color: hoveredCard === 'buyer' ? 'white' : '#00897B' }} />
                </div>
                
                <h4 className="text-2xl font-bold mb-4" style={{ color: '#0D1B2A' }}>
                  I'm a Buyer
                </h4>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Discover authentic, handcrafted products from artisans around the world. 
                  Shop with confidence and support local businesses.
                </p>
                
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400" style={{ backgroundColor: '#FFB300' }}></div>
                    <span className="text-gray-700">Curated authentic products</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400" style={{ backgroundColor: '#FFB300' }}></div>
                    <span className="text-gray-700">Direct from artisans</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400" style={{ backgroundColor: '#FFB300' }}></div>
                    <span className="text-gray-700">Verified seller profiles</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400" style={{ backgroundColor: '#FFB300' }}></div>
                    <span className="text-gray-700">Secure shopping experience</span>
                  </li>
                </ul>
                
                <button className="w-full bg-teal-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-teal-700 transition-colors duration-300 group"
                  style={{ backgroundColor: '#00897B' }}>
                  <span>Start Shopping</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#0D1B2A' }}>
              Built for Trust & Growth
            </h3>
            <p className="text-xl text-gray-600">
              Everything you need to succeed in the global marketplace
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <Shield className="w-8 h-8 text-blue-600" style={{ color: '#1E88E5' }} />
              </div>
              <h4 className="text-xl font-semibold mb-2" style={{ color: '#0D1B2A' }}>Verified Authenticity</h4>
              <p className="text-gray-600">Every product and seller is verified to ensure authentic, quality craftsmanship.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                <Zap className="w-8 h-8 text-teal-600" style={{ color: '#00897B' }} />
              </div>
              <h4 className="text-xl font-semibold mb-2" style={{ color: '#0D1B2A' }}>Seamless Experience</h4>
              <p className="text-gray-600">Intuitive platform designed for easy selling and buying across cultures.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
                <Globe className="w-8 h-8 text-amber-600" style={{ color: '#FFB300' }} />
              </div>
              <h4 className="text-xl font-semibold mb-2" style={{ color: '#0D1B2A' }}>Global Reach</h4>
              <p className="text-gray-600">Connect local artisans with customers worldwide through our global network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer></Footer>

    </div>
  );
};

export default HomePage;