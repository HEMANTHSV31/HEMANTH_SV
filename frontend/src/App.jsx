import React, { useState } from 'react';
import DemoUserDashboard from './components/DemoUserDashboard';
import DemoNGODashboard from './components/DemoNGODashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('user'); // 'user' or 'ngo'

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌳</span>
              <span className="text-xl font-bold text-green-800">Tree Donation Platform</span>
            </div>
            
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setCurrentView('user')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  currentView === 'user'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                👤 User Dashboard
              </button>
              <button
                onClick={() => setCurrentView('ngo')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  currentView === 'ngo'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                🏢 NGO Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentView === 'user' ? <DemoUserDashboard /> : <DemoNGODashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🌱</span>
            <span className="text-lg font-semibold">Tree Donation Platform</span>
          </div>
          <p className="text-gray-400">
            Making the world greener, one tree at a time. Built with React, Node.js, and MySQL.
          </p>
          <div className="mt-4 text-sm text-gray-400">
            © 2024 Tree Donation Platform. Built by Hemanth SV
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
