import React, { useState } from 'react';
import { Mail, Phone, MapPin, Edit3, Star , Tag} from 'lucide-react';
import { Pencil } from "lucide-react";
import useimageuploader from '../../hook/useimageuploader';
const MyListings= () => {
  const [image,imageUrl,loading,handleImageChange,handleUpload]=useimageuploader();
  const [image1,imageUrl1,loading1,handleImageChange1,handleUpload1]=useimageuploader();
  const [isEditing, setIsEditing] = useState(false);
  const [shop, setShop] = useState({
    name: 'EcoFind Store',
    email: 'ecofinds@example.com',
    phone: '+91 9876543210',
    category:"Handicrafts",
    location: '123 Green Street, Kolkata, India',
    
    description: 'We provide eco-friendly, sustainable, and handmade products 🌱',
    logo: 'https://i.pinimg.com/736x/5c/64/06/5c640637aa7a0282966fdf2cf39926b1.jpg',
    cover: 'https://i.pinimg.com/736x/5c/64/06/5c640637aa7a0282966fdf2cf39926b1.jpg',
    rating:4.5,
  });

  const handleSave = () => {
    console.log("Saved shop data:", shop);
    setIsEditing(false);
  };
  const [coverPreview, setCoverPreview] = useState(shop.cover);
  const [logoPreview, setLogoPreview] = useState(shop.logo);
  const [changed, setChanged] = useState(false);
    const handleImageChanges = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "cover"){ 
        setCoverPreview(url)
        handleImageChange(e)

      };
      if (type === "logo") {
        setLogoPreview(url)
         handleImageChange1(e)
      };
      setChanged(true);
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen p-6">
      {/* Cover Banner */}
 <div className="rounded-lg mb-8 border border-gray-200 shadow-sm bg-white">
      {/* Cover Section */}
      <div className="relative h-48 w-full rounded-lg overflow-hidden">
        <img
          src={coverPreview}
          alt="cover"
          className="w-full h-full object-cover"
        />

        {/* Cover Edit Icon */}
        <label className="absolute top-3 right-3 bg-white p-2 z-10 rounded-full shadow cursor-pointer">
          <Pencil size={18} className="text-gray-600" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChanges(e, "cover")}
          />
        </label>

        {/* Logo Section */}
        <div className="absolute inset-0 flex items-end px-6 pb-4">
          <div className="relative">
            <img
              src={logoPreview}
              alt="logo"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />

            {/* Logo Edit Icon */}
            <label className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow cursor-pointer">
              <Pencil size={16} className="text-gray-600" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChanges(e, "logo")}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      {changed && (
        <div className="p-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            onClick={async() => {
              // your save logic here
              shop.logo=await handleUpload;
              shop.cover=await handleUpload;
              setChanged(false);
            }}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>

      {/* Shop Details */}
      <div className="rounded-lg p-6 mb-8 border border-gray-200 shadow-sm bg-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#0D1B2A]">Shop Profile</h2>

          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-[#1E88E5] text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
            >
              <span className="font-medium">Save</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors text-[#1E88E5]"
            >
              <Edit3 size={18} />
              <span className="font-medium">Edit Profile</span>
            </button>
          )}
        </div>

          
        {/* Details Section */}
        <div className="flex flex-col gap-4">
          {isEditing ? (
            <>
              <div>
                <label htmlFor="shop-name" className="block text-sm font-medium text-gray-700">Shop Name</label>
                <input id="shop-name" type="text" value={shop.name} onChange={(e) => setShop({ ...shop, name: e.target.value })}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none" />
              </div>
              <div>
                <label htmlFor="shop-email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="shop-email" type="email" value={shop.email} onChange={(e) => setShop({ ...shop, email: e.target.value })}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none" />
              </div>
              <div>
                <label htmlFor="shop-phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input id="shop-phone" type="text" value={shop.phone} onChange={(e) => setShop({ ...shop, phone: e.target.value })}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none" />
              </div>
              <div>
                <label htmlFor="shop-category" className="block text-sm font-medium text-gray-700">Category</label>
                <input id="shop-category" type="text" value={shop.category} onChange={(e) => setShop({ ...shop, category: e.target.value })}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none" />
              </div>
              <div>
                <label htmlFor="shop-location" className="block text-sm font-medium text-gray-700">Location</label>
                <input id="shop-location" type="text" value={shop.location} onChange={(e) => setShop({ ...shop, location: e.target.value })}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none" />
              </div>
             
              <div>
                <label htmlFor="shop-description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="shop-description" value={shop.description} onChange={(e) => setShop({ ...shop, description: e.target.value })}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none"
                />
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-[#0D1B2A]">{shop.name}</h3>
              <p className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2 text-[#00897B]" /> {shop.email}
              </p>
              <p className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2 text-[#00897B]" /> {shop.phone}
              </p>
              <p className="flex items-center text-gray-600">
                <Tag size={16} className="mr-2 text-[#00897B]" /> {shop.category}
              </p>
              <p className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-2 text-[#00897B]" /> {shop.location}
              </p>
              <p className="flex items-center text-gray-600">
                <Star size={16} className="mr-2 text-[#00897B]" /> {shop.rating}
              </p>
              <p className="mt-2 text-[#0D1B2A]">{shop.description}</p>

              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListings;