import React from 'react';
import { BarChart3, CreditCard, MessageSquare,LayoutDashboardIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigate=useNavigate()
  const menuItems = [
    { id: 'profile', label: 'Profile', icon: BarChart3 },
    { id: 'messages', label: 'Products', icon: MessageSquare },
    // { id: 'orders', label: 'Orders', icon: CreditCard },
  ];

  return (
    <div className="bg-slate-800 text-white w-64 min-h-screen p-6">
      <div className="mb-8">
        <p className="text-2xl md:text-4xl font-extrabold tracking-tight 
              bg-gradient-to-r from-gray-100 via-gray-300 to-white 
              bg-clip-text text-transparent drop-shadow-md">
  EcoFinds
</p>

      </div>
      
      <nav className="space-y-4">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              activeSection === id ? 'bg-slate-700' : 'hover:bg-slate-700'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
        <button onClick={() => navigate('/dashboard')} className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors`}>
           <LayoutDashboardIcon/> Dashboard
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;