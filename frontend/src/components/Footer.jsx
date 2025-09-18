import React from 'react'
import { Globe } from 'lucide-react'
const Footer = () => {
  return (
    <div className="min-h-screen bg-gray-50" style={{ backgroundColor: '#F5F7FA' }}>

          <footer className="bg-gray-900 text-white py-12" style={{ backgroundColor: '#0D1B2A' }}>
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Globe className="w-8 h-8" />
            <span className="text-2xl font-bold">GlobalCraft</span>
          </div>
          <p className="text-gray-400">
            Empowering artisans. Building trust. Creating global connections.
          </p>
        </div>
      </footer>
    </div>
  ) 
}

export default Footer