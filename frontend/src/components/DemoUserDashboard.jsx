import React, { useState } from 'react';

const DemoUserDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Demo data for display
  const demoTrees = [
    {
      tree_id: 1,
      location: 'Bangalore, Karnataka',
      ngo_name: 'Green Earth Foundation',
      ngo_address: 'Bangalore, Karnataka, India',
      created_at: '2024-09-11T10:30:00Z',
      message: 'For a greener future!'
    },
    {
      tree_id: 2,
      location: 'Mumbai, Maharashtra', 
      ngo_name: 'Tree Plantation Society',
      ngo_address: 'Mumbai, Maharashtra, India',
      created_at: '2024-09-10T15:45:00Z',
      message: 'Save our planet'
    }
  ];

  const openDonationModal = () => {
    setShowModal(true);
  };

  const handleSubmitDonation = (e) => {
    e.preventDefault();
    setShowModal(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">🌳 Tree Donation Platform</h1>
          <p className="text-gray-600">Make a difference by donating trees to support reforestation</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={openDonationModal}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            🌱 Donate Tree
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            🔄 View My Donations
          </button>
        </div>

        {/* User Trees List */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Donated Trees ({demoTrees.length})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoTrees.map((tree) => (
              <div key={tree.tree_id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-600">Tree #{tree.tree_id}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(tree.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-2">{tree.location}</h3>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Assigned NGO:</strong> {tree.ngo_name}</p>
                  <p><strong>NGO Location:</strong> {tree.ngo_address}</p>
                  <p><strong>Message:</strong> {tree.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">🌱 Donate Trees</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmitDonation} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter donation location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Trees *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      defaultValue="1"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message (Optional)
                    </label>
                    <textarea
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Add a message with your donation..."
                    />
                  </div>

                  <div className="bg-green-50 p-3 rounded-md">
                    <p className="text-sm text-green-700">
                      📍 Location detected: 12.9716, 77.5946
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Donate Trees
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-green-800 mb-4">Donation Successful!</h3>
                
                <div className="bg-green-50 p-4 rounded-lg mb-4 text-left">
                  <p className="text-sm text-green-700 mb-2">
                    <strong>Trees Donated:</strong> 3
                  </p>
                  <p className="text-sm text-green-700 mb-2">
                    <strong>Assigned NGO:</strong> Green Earth Foundation
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>NGO Location:</strong> Bangalore, Karnataka, India
                  </p>
                </div>

                <p className="text-gray-600 mb-6">
                  Thank you for making a difference! Your trees have been assigned to the nearest NGO for planting.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => {setShowSuccess(false); openDonationModal();}}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Donate Again
                  </button>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    View My Donations
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoUserDashboard;