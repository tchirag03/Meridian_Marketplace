import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Buyer from './pages/Buyer'
import HomePage from './pages/Home'
import SellerLogin from './pages/SellerLogin'
import SellerSignup from './pages/SellerSignin'
import SellerDashboard from './pages/Seller'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/buyer" element={<Buyer/>} />
        <Route path="/sellerlogin" element={<SellerLogin />} />
        <Route path="/sellersignup" element={<SellerSignup />} />
        <Route path="/seller" element={<SellerDashboard />} />
    </Routes>
  )
}

export default App
