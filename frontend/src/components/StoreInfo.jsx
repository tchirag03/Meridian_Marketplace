import { useState } from "react";

export default function StoreInfo({ handleImage }) {
  const [store, setStore] = useState({
    storeName: "My Awesome Store",
    description: "Best handmade crafts and goods.",
    category: "Handicrafts",
    location: "Los Angeles",
    rating: 4.5,
    banner: null,
    logo: null,
  });

  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#0D1B2A]">Store Information</h2>

      {/* Banner Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Store Banner</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImage(e.target.files[0], "banner")}
          className="mt-2"
        />
      </div>

      {/* Logo Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Store Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImage(e.target.files[0], "logo")}
          className="mt-2"
        />
      </div>

      {/* Editable Fields */}
      {["storeName", "description", "category", "location"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 capitalize">
            {field}
          </label>
          <input
            type="text"
            name={field}
            value={store[field]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none"
          />
        </div>
      ))}

      {/* Rating (Read-only) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <p className="text-lg font-semibold text-[#1E88E5]">{store.rating} ⭐</p>
      </div>
    </div>
  );
}
