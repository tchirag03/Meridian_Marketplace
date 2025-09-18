import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Buyer from './pages/Buyer'
import HomePage from './pages/Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/buyer" element={<Buyer/>} />
        {/* <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  )
}

export default App
