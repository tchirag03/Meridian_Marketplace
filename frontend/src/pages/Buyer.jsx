import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Buyer = () => {
     const stores = [
    {
      id: 1,
      name: "Handcrafted Haven",
      owner: "Artisan A",
      category: "Home Decor",
      image: "https://via.placeholder.com/300x200.png?text=Handcrafted+Haven",
    },
    {
      id: 2,
      name: "Clay & Craft",
      owner: "Potter B",
      category: "Pottery",
      image: "https://via.placeholder.com/300x200.png?text=Clay+%26+Craft",
    },
    {
      id: 3,
      name: "Threads of Tradition",
      owner: "Weaver C",
      category: "Textiles",
      image: "https://via.placeholder.com/300x200.png?text=Threads+of+Tradition",
    },
    {
      id: 4,
      name: "Global Spices",
      owner: "Chef D",
      category: "Food",
      image: "https://via.placeholder.com/300x200.png?text=Global+Spices",
    },
    {
      id: 5,
      name: "Wood Wonders",
      owner: "Carpenter E",
      category: "Furniture",
      image: "https://via.placeholder.com/300x200.png?text=Wood+Wonders",
    },
  ];
  return (
    
    <div>
        <Navbar/>
            <div className="min-h-screen bg-[#F5F7FA]">
     
      

      {/* Content */}
      <main className="pt-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0D1B2A] mb-6">
          Recommended Stores
        </h1>

        {/* Grid of stores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
            >
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold text-[#1E88E5]">
                {store.name}
              </h2>
              <p className="text-sm text-gray-600">By {store.owner}</p>
              <span className="mt-2 inline-block text-xs px-3 py-1 bg-[#00897B] text-white rounded-full self-start">
                {store.category}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
        <Footer></Footer>
    </div>
  )
}

export default Buyer