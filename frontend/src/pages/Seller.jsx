import { useState } from "react";
import { Menu, X } from "lucide-react";
import SellerProfile from "../components/SellerProfile";
import StoreInfo from "../components/StoreInfo";
import Products from "../components/SellerProduct";

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-[#0D1B2A] text-white flex-col">
        <h1 className="text-xl font-bold px-6 py-4 border-b border-gray-700">
          Seller Dashboard
        </h1>
        <nav className="flex flex-col mt-4">
          <button
            className={`px-6 py-3 text-left hover:bg-[#1E88E5] transition ${
              activeTab === "profile" ? "bg-[#1E88E5]" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`px-6 py-3 text-left hover:bg-[#1E88E5] transition ${
              activeTab === "products" ? "bg-[#1E88E5]" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button
            className={`px-6 py-3 text-left hover:bg-[#1E88E5] transition ${
              activeTab === "store" ? "bg-[#1E88E5]" : ""
            }`}
            onClick={() => setActiveTab("store")}
          >
            Store Info
          </button>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar Drawer */}
          <aside className="relative w-64 bg-[#0D1B2A] text-white flex flex-col z-50">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <h1 className="text-xl font-bold">Seller Dashboard</h1>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col mt-4">
              <button
                className={`px-6 py-3 text-left hover:bg-[#1E88E5] transition ${
                  activeTab === "profile" ? "bg-[#1E88E5]" : ""
                }`}
                onClick={() => {
                  setActiveTab("profile");
                  setSidebarOpen(false);
                }}
              >
                Profile
              </button>
              <button
                className={`px-6 py-3 text-left hover:bg-[#1E88E5] transition ${
                  activeTab === "products" ? "bg-[#1E88E5]" : ""
                }`}
                onClick={() => {
                  setActiveTab("products");
                  setSidebarOpen(false);
                }}
              >
                Products
              </button>
              <button
                className={`px-6 py-3 text-left hover:bg-[#1E88E5] transition ${
                  activeTab === "store" ? "bg-[#1E88E5]" : ""
                }`}
                onClick={() => {
                  setActiveTab("store");
                  setSidebarOpen(false);
                }}
              >
                Store Info
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <header className="md:hidden bg-[#0D1B2A] text-white flex items-center justify-between px-4 py-3 shadow">
          <h1 className="text-lg font-bold">Seller Dashboard</h1>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 p-6">
          {activeTab === "profile" && <SellerProfile />}
          {activeTab === "products" && <Products />}
          {activeTab === "store" && (
            <StoreInfo
              handleImage={(file, type) => {
                console.log("Handle image upload:", type, file);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
