import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Your login logic here
    console.log("Seller Login:", { email, password });
  };
  
  const navigate=useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-[#0D1B2A] mb-6">
          Seller Login
        </h1>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seller@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#1E88E5] hover:bg-[#1565C0] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>

        {/* Create Account Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate('/sellersignup')}
            className="text-[#1E88E5] font-medium hover:underline"
          >
            Create Seller Account
          </button>
        </p>
      </div>
    </div>
  );
}
