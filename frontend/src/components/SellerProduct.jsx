
import React from 'react';

const ProductsTab = () => {
  const products = [
    { id: 1, name: 'Smartphone XYZ', description: 'Latest smartphone with all features', price: 12000, image: 'https://i.pinimg.com/736x/5c/64/06/5c640637aa7a0282966fdf2cf39926b1.jpg', available: true },
    { id: 2, name: 'Used Laptop ABC', description: 'High-performance laptop for work & gaming', price: 25000, image: '/about.png', available: true },
    { id: 3, name: 'Mountain Bike', description: 'Durable bike for all terrains', price: 18000, image: '/contact.png', available: false },
    { id: 4, name: 'Gaming Chair', description: 'Comfortable chair for long gaming sessions', price: 8000, image: '/header.png', available: true },
  ];

  return (
    <div className=" rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">All Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center text-center"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-auto h-auto object-cover  mb-4"
            />


            {/* Name */}
            <h3 className="font-semibold text-lg text-gray-900">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm">{product.description}</p>

            {/* Price */}
            <p className="text-gray-900 font-medium mt-2">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTab;