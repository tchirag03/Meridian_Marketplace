import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, UserCircle } from "lucide-react";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div
            onClick={() => navigate("/buyer")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] flex items-center justify-center text-white font-bold text-lg shadow-md">
              L
            </div>
            <span className="text-xl font-semibold text-[#0D1B2A] hidden sm:block">
              LocalMarket
            </span>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={()=> navigate(`/stores/?q=${query}`)}
            className="flex-1 max-w-xl mx-4  md:flex"
          >
            <div className="relative w-full flex">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, artisans..."
                className="w-full rounded-l-full border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] shadow-sm"
              />
              <button
                type="submit"
                className="bg-[#1E88E5] hover:bg-[#1565C0] text-white px-5 rounded-r-full font-medium transition-colors"
                
              >
                Search
              </button>
            </div>
          </form>

          {/* Profile */}
          <div
            onClick={() => navigate("/profile")}
            className="cursor-pointer flex items-center"
          >
            <UserCircle className="w-9 h-9 text-[#00897B] hover:text-[#00695C] transition-colors" />
          </div>
        </div>
      </div>
    </nav>
  );
}
