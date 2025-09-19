import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Store, Package, DollarSign, ShoppingCart, TrendingUp, Calendar, Star } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Mock Data - Replace with actual API calls
const getMockData = () => ({
  totalUsers: 1250,
  totalStores: 85,
  totalProducts: 2340,
  totalOrders: 567,
  totalRevenue: 125000,
  usersByRole: { buyers: 1050, sellers: 200 },
  ordersByStatus: {
    'Pending': 45,
    'Processing': 78,
    'Shipped': 123,
    'Delivered': 298,
    'Cancelled': 23
  },
  productsByCategory: {
    'Electronics': 450,
    'Clothing': 380,
    'Home & Garden': 290,
    'Books': 220,
    'Sports': 180,
    'Beauty': 150,
    'Toys': 120,
    'Others': 550
  },
  revenueByMonth: [
    { month: 'Jan', revenue: 8500 },
    { month: 'Feb', revenue: 12000 },
    { month: 'Mar', revenue: 15500 },
    { month: 'Apr', revenue: 18000 },
    { month: 'May', revenue: 22000 },
    { month: 'Jun', revenue: 25000 }
  ],
  topRatedStores: [
    { name: 'TechHub Store', rating: 4.8, orders: 156 },
    { name: 'Fashion Central', rating: 4.7, orders: 134 },
    { name: 'Home Essentials', rating: 4.6, orders: 98 },
    { name: 'Book Paradise', rating: 4.5, orders: 87 },
    { name: 'Sports Zone', rating: 4.4, orders: 76 }
  ],
  orderTrends: [
    { date: '2024-01', orders: 45 },
    { date: '2024-02', orders: 67 },
    { date: '2024-03', orders: 89 },
    { date: '2024-04', orders: 123 },
    { date: '2024-05', orders: 156 },
    { date: '2024-06', orders: 178 }
  ],
  averageOrderValue: 220.5,
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#0D1B2A', // Text: Dark Navy
        font: { size: 14 }
      },
    },
    tooltip: {
      backgroundColor: '#0D1B2A', // Dark Navy
      titleColor: '#F5F7FA', // Cool Gray
      bodyColor: '#F5F7FA', // Cool Gray
      borderColor: '#1E88E5', // Primary
      borderWidth: 1,
    }
  },
  scales: {
    x: {
      ticks: { color: '#0D1B2A' },
      grid: { color: 'rgba(13, 27, 42, 0.1)' }, // Dark Navy with transparency
      title: { display: false, color: '#0D1B2A' }
    },
    y: {
      ticks: { color: '#0D1B2A' },
      grid: { color: 'rgba(13, 27, 42, 0.1)' }, // Dark Navy with transparency
      title: { display: false, color: '#0D1B2A' }
    },
  },
};

const DashboardHeader = () => (
  <div className="mb-8">
    <h1 className="text-3xl md:text-4xl font-bold text-text-color mb-2">Marketplace Analytics Dashboard</h1>
    <p className="text-lg text-text-color opacity-80">Comprehensive overview of your marketplace performance</p>
  </div>
);

const MetricCard = ({ title, value, icon, iconColorClass }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transition-transform duration-300 hover:scale-105">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-text-color mt-1">{value}</p>
    </div>
    <div className={`h-12 w-12 flex items-center justify-center rounded-full ${iconColorClass} bg-opacity-20`}>
      {React.cloneElement(icon, { className: "h-6 w-6" })}
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-xl font-semibold text-text-color mb-4">{title}</h3>
    <div>{children}</div>
  </div>
);

const TopStoresList = ({ stores }) => (
  <div className="space-y-3">
    {stores.map((store, index) => (
      <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg shadow-sm">
        <div>
          <p className="font-medium text-text-color">{store.name}</p>
          <div className="flex items-center text-accent text-sm mt-1">
            <Star className="h-4 w-4 fill-current mr-1" />
            <span>{store.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">{store.orders} orders</p>
      </div>
    ))}
  </div>
);

const LoadingSpinner = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary mx-auto"></div>
      <p className="mt-4 text-lg text-text-color opacity-80">Loading dashboard data...</p>
    </div>
  </div>
);

function DataVisualize() {
  const [dashboardData, setDashboardData] = useState({ loading: true });

  useEffect(() => {
    const fetchDashboardData = () => {
      setTimeout(() => {
        setDashboardData({ ...getMockData(), loading: false });
      }, 1000);
    };
    fetchDashboardData();
  }, []);

  if (dashboardData.loading) {
    return <LoadingSpinner />;
  }

  const { 
    totalStores, totalProducts, totalRevenue, totalOrders, averageOrderValue, 
    usersByRole, ordersByStatus, productsByCategory, revenueByMonth, orderTrends, topRatedStores 
  } = dashboardData;

  const userRoleData = {
    labels: ['Buyers', 'Sellers'],
    datasets: [{
      data: [usersByRole.buyers, usersByRole.sellers],
      backgroundColor: ['#1E88E5', '#00897B'], // Primary, Secondary
      borderColor: ['#1E88E5', '#00897B'],
      borderWidth: 1,
    }],
  };

  const orderStatusData = {
    labels: Object.keys(ordersByStatus),
    datasets: [{
      label: 'Orders by Status',
      data: Object.values(ordersByStatus),
      backgroundColor: [
        '#FFB300', // Accent
        '#1E88E5', // Primary
        '#00897B', // Secondary
        '#0D1B2A', // Dark Navy (Text)
        '#F5F7FA', // Cool Gray (Background)
        '#607D8B', // A shade of gray
      ],
      borderColor: [
        '#FFB300', // Accent
        '#1E88E5', // Primary
        '#00897B', // Secondary
        '#0D1B2A', // Dark Navy (Text)
        '#F5F7FA', // Cool Gray (Background)
        '#607D8B', // A shade of gray
      ],
      borderWidth: 1,
    }],
  };

  const categoryData = {
    labels: Object.keys(productsByCategory),
    datasets: [{
      label: 'Products by Category',
      data: Object.values(productsByCategory),
      backgroundColor: [
        '#1E88E5', // Primary
        '#00897B', // Secondary
        '#FFB300', // Accent
        '#0D1B2A', // Dark Navy (Text)
        '#607D8B', // A shade of gray
        '#795548', // A shade of brown
        '#4CAF50', // A shade of green
        '#9E9E9E', // A shade of gray
      ],
      borderColor: [
        '#1E88E5', // Primary
        '#00897B', // Secondary
        '#FFB300', // Accent
        '#0D1B2A', // Dark Navy (Text)
        '#607D8B', // A shade of gray
        '#795548', // A shade of brown
        '#4CAF50', // A shade of green
        '#9E9E9E', // A shade of gray
      ],
      borderWidth: 1,
    }],
  };

  const revenueData = {
    labels: revenueByMonth.map(item => item.month),
    datasets: [{
      label: 'Revenue ($)',
      data: revenueByMonth.map(item => item.revenue),
      borderColor: '#00897B', // Secondary
      backgroundColor: 'rgba(0, 137, 123, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  const orderTrendData = {
    labels: orderTrends.map(item => item.date),
    datasets: [{
      label: 'Orders',
      data: orderTrends.map(item => item.orders),
      borderColor: '#1E88E5', // Primary
      backgroundColor: 'rgba(30, 136, 229, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Total Stores" value={totalStores.toLocaleString()} icon={<Store />} iconColorClass="text-secondary bg-secondary" />
          <MetricCard title="Total Products" value={totalProducts.toLocaleString()} icon={<Package />} iconColorClass="text-primary bg-primary" />
          <MetricCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={<DollarSign />} iconColorClass="text-accent bg-accent" />
          <MetricCard title="Total Orders" value={totalOrders.toLocaleString()} icon={<ShoppingCart />} iconColorClass="text-indigo-500 bg-indigo-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartCard title="User Distribution">
            <div className="h-64"><Doughnut data={userRoleData} options={chartOptions} /></div>
          </ChartCard>
          <ChartCard title="Order Status">
            <div className="h-64"><Bar data={orderStatusData} options={chartOptions} /></div>
          </ChartCard>
          <ChartCard title="Revenue Trend">
            <div className="h-64"><Line data={revenueData} options={chartOptions} /></div>
          </ChartCard>
          <ChartCard title="Order Trends">
            <div className="h-64"><Line data={orderTrendData} options={chartOptions} /></div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <ChartCard title="Products by Category">
              <div className="h-80"><Pie data={categoryData} options={chartOptions} /></div>
            </ChartCard>
          </div>
          <div>
            <ChartCard title="Top Rated Stores">
              <TopStoresList stores={topRatedStores} />
            </ChartCard>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard title="Average Order Value" value={`$${averageOrderValue}`} icon={<TrendingUp />} iconColorClass="text-red-500 bg-red-500" />
          <MetricCard title="Growth Rate" value="+12.5%" icon={<Calendar />} iconColorClass="text-orange-500 bg-orange-500" />
        </div>
      </div>
    </div>
  );
}

export default DataVisualize;