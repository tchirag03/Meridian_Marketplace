  import React, { useState } from 'react';
  import Sidebar from '../components/Dashboard/Sidebar.jsx';
  import ProductsTab from '../components/SellerProduct.jsx';
  import MyListings from '../components/Dashboard/Mylistings.jsx';
  import Orders from '../components/Dashboard/Orders.jsx';
//   import Messages from '../components/Dashboard/Messages.jsx';

  const SellerDashboard = () => {
    const [activeSection, setActiveSection] = useState('products');

    const renderContent = () => {
      switch (activeSection) {
        case 'proflie': return <MyListings />;
        case 'orders': return <Orders />;
        case 'messages': return <ProductsTab/>
        
        default: return <MyListings />;
      }
    };

    return (
      <div className="flex min-h-screen ">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    );
  };

  export default SellerDashboard;