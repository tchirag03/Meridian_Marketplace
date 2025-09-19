import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const url=import.meta.env.VITE_BACKEND_URL
export default function SellerSignup() {
    const navigate=useNavigate();
      const [isloading,setisloading]=useState(false)
  const [error,seterror]=useState(false)
  const [msg,setmsg]=useState('')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "seller",
    storeName: "",
  });

  const handleChange = (e) => {
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
       
       console.log(url)
    setisloading(true)
    axios.post(`${url}auth/signup`,formData).then((val)=>{
        
        localStorage.setItem('token',val.data.token)
        navigate('/seller')
    }).catch((error)=>{
        console.log(error)
        seterror(true)
        setmsg(error.response.data.message)
    }).finally(()=>{setisloading(false)})
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-[#0D1B2A] mb-6">
          Create Seller Account
        </h1>

        {/* Signup Form */}
        <div  className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none"
            >
              <option value="Seller">Seller</option>
              <option value="Buyer">Buyer</option>
            </select>
          </div>

          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Name
            </label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              placeholder="My Awesome Store"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-[#1E88E5] hover:bg-[#1565C0] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Sign Up
          </button>
        </div>

        {/* Already have account */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() =>navigate('/sellerlogin') }
            className="text-[#1E88E5] font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
