import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { User as UserIcon, Mail, MapPin, Phone, ShoppingBag, Calendar, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3333';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary mx-auto"></div>
      <p className="mt-4 text-lg text-text-color opacity-80">Loading profile...</p>
    </div>
  </div>
);

const BuyerProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (!token) {
          setError('No authentication token found. Please log in.');
          setLoading(false);
            navigate("/")
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch user details
        const userRes = await axios.get(`${API_BASE_URL}/auth/me`, config);
        setUser(userRes.data);

        // Fetch order history
        const ordersRes = await axios.get(`${API_BASE_URL}/order/me`, config);
        setOrders(ordersRes.data);

      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError(err.response?.data?.message || 'Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-red-500 text-xl">Error: {error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-text-color text-xl">User data not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-text-color mb-6">My Profile</h1>

          {/* User Details Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-text-color mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-text-color">
                <UserIcon className="h-5 w-5 mr-2 text-primary" />
                <p><span className="font-medium">Name:</span> {user.name}</p>
              </div>
              <div className="flex items-center text-text-color">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <p><span className="font-medium">Email:</span> {user.email}</p>
              </div>
              {user.location && (
                <div className="flex items-center text-text-color">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <p><span className="font-medium">Location:</span> {user.location}</p>
                </div>
              )}
              {user.phoneNumber && (
                <div className="flex items-center text-text-color">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  <p><span className="font-medium">Phone:</span> {user.phoneNumber}</p>
                </div>
              )}
            </div>
          </div>

          {/* Order History Section */}
          <h2 className="text-3xl font-bold text-text-color mb-6">Order History</h2>
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-600">
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order._id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4 border-b pb-4 border-gray-200">
                    <h3 className="text-xl font-semibold text-primary">Order ID: {order._id}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium 
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-text-color">
                      <Calendar className="h-5 w-5 mr-2 text-secondary" />
                      <p><span className="font-medium">Order Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center text-text-color">
                      <DollarSign className="h-5 w-5 mr-2 text-secondary" />
                      <p><span className="font-medium">Total Amount:</span> ${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-text-color mb-3">Items:</h4>
                  <div className="space-y-3">
                    {order.items.map(item => (
                      <div key={item._id} className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <img 
                          src={item.product?.imageUrls?.[0] || 'https://via.placeholder.com/50'} 
                          alt={item.product?.name || 'Product Image'} 
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <p className="font-medium text-text-color">{item.product?.name || 'Unknown Product'}</p>
                          <p className="text-sm text-gray-600">Store: {item.store?.storeName || 'Unknown Store'}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-sm font-semibold text-primary">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyerProfile;
