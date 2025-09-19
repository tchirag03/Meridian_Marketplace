import { useState } from "react";

export default function SellerProfile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "seller@example.com",
    location: "New York",
    phone: "+1 234 567 890",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#0D1B2A]">Profile</h2>

      <div className="space-y-4">
        {["name", "email", "location", "phone"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field}
            </label>
            <input
              type="text"
              name={field}
              value={profile[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
