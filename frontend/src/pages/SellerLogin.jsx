import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
const url=import.meta.env.VITE_BACKEND_URL

export default function SellerLogin() {
    const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading,setisloading]=useState(false)
  const [error,seterror]=useState(false)
  const [msg,setmsg]=useState('')

  const handleLogin = (e) => {
    
    setisloading(true)
    axios.post(`${url}auth/login`,{email,password}).then((val)=>{
        localStorage.setItem('token',`bareer ${val.data.token}`)
        navigate('/seller')
    }).catch((error)=>{
        console.log(error)
        seterror(true)
        setmsg(error.response.data.message)
    }).finally(()=>{setisloading(false)})
  };

  
  return (
    isloading ? (
      <Loading />
    ) : error ? (
      <div className="text-center text-4xl">{msg}</div>
    ) : (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-6">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-[#0D1B2A] mb-6">
            Seller Login
          </h1>

          {/* Login Form */}
          <div className="space-y-5">
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
            onClick={handleLogin}
             
              className="w-full bg-[#1E88E5] hover:bg-[#1565C0] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Login
            </button>
          </div>

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
    )
  );
}
