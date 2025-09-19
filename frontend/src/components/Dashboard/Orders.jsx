import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("New");

  const tabs = ["New", "Pending", "Completed"];

  // Dummy data
  const ordersData = {
    New: [
      { id: "Order #1001", amount: "$10" },
      { id: "Order #1002", amount: "$80" },
    ],
    Pending: [
      { id: "Order #1003", amount: "$200" },
      { id: "Order #1004", amount: "$95" },
    ],
    Completed: [
      { id: "Order #1005", amount: "$150" },
      { id: "Order #1006", amount: "$300" },
    ],
  };

  const orders = ordersData[activeTab] || [];

  return (
    <div className="rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div>
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 mb-3"
          >
            <div>
              <h3 className="font-semibold text-gray-900">{order.id}</h3>
              <p className="text-lg font-bold text-gray-800">{order.amount}</p>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;