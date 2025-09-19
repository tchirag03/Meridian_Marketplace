import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Buyer from './pages/Buyer'
import HomePage from './pages/Home'
import SellerLogin from './pages/SellerLogin'
import SellerSignup from './pages/SellerSignin'
import StoresDisplay from './pages/storesDisplay'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/buyer" element={<Buyer/>} />
        <Route path="/sellerlogin" element={<SellerLogin />} />
        <Route path="/sellersignup" element={<SellerSignup />} />
        <Route path='/stores/' element={<StoresDisplay />} />
        
    </Routes>
  )
}

export default App
