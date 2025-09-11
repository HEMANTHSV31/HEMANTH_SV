import React, { useState } from 'react';

const DemoNGODashboard = () => {
  const [ngoId, setNgoId] = useState('1');
  
  // Demo data
  const ngoData = {
    name: 'Green Earth Foundation',
    address: 'Bangalore, Karnataka, India',
    contact_email: 'contact@greenearth.org',
    phone: '+91-9876543210',
    latitude: 12.9716,
    longitude: 77.5946
  };

  const totalTrees = 24;
  
  const donations = [
    {
      tree_id: 1,
      donor_name: 'John Doe',
      donor_email: 'john.doe@example.com',
      latitude: 12.9716,
      longitude: 77.5946,
      location: 'Bangalore, Karnataka',
      message: 'For a greener future!',
      created_at: '2024-09-11T10:30:00Z'
    },
    {
      tree_id: 2,
      donor_name: 'Jane Smith',
      donor_email: 'jane.smith@example.com',
      latitude: 12.9500,
      longitude: 77.6000,
      location: 'Whitefield, Bangalore',
      message: 'Save our planet',
      created_at: '2024-09-10T15:45:00Z'
    },
    {
      tree_id: 3,
      donor_name: 'Raj Kumar',
      donor_email: 'raj.kumar@example.com',
      latitude: 12.9800,
      longitude: 77.5800,
      location: 'Koramangala, Bangalore',
      message: 'Every tree counts',
      created_at: '2024-09-09T09:15:00Z'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">🏢 NGO Dashboard</h1>
          <p className="text-gray-600">Manage and view tree donations received by your NGO</p>
        </div>

        {/* NGO Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Select NGO</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              🔄 Refresh
            </button>
          </div>
          
          <select
            value={ngoId}
            onChange={(e) => setNgoId(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Green Earth Foundation</option>
            <option value="2">Tree Plantation Society</option>
            <option value="3">Nature Conservation Trust</option>
            <option value="4">Eco Warriors NGO</option>
            <option value="5">Save Trees Initiative</option>
          </select>
        </div>

        {/* NGO Info & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* NGO Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">NGO Information</h2>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-700">Name: </span>
                <span className="text-gray-600">{ngoData.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Address: </span>
                <span className="text-gray-600">{ngoData.address}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Contact Email: </span>
                <span className="text-gray-600">{ngoData.contact_email}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Phone: </span>
                <span className="text-gray-600">{ngoData.phone}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Location: </span>
                <span className="text-gray-600">
                  {ngoData.latitude.toFixed(4)}, {ngoData.longitude.toFixed(4)}
                </span>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div style={{background: 'linear-gradient(45deg, #16a34a, #2563eb)'}} className="rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">🌳 Impact Statistics</h2>
            <div className="space-y-4">
              <div style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}} className="rounded-lg p-4">
                <div className="text-3xl font-bold">{totalTrees}</div>
                <div className="text-sm" style={{opacity: 0.9}}>Total Trees Donated</div>
              </div>
              <div style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}} className="rounded-lg p-4">
                <div className="text-3xl font-bold">{donations.length}</div>
                <div className="text-sm" style={{opacity: 0.9}}>Total Donations Received</div>
              </div>
              <div style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}} className="rounded-lg p-4">
                <div className="text-3xl font-bold">
                  {Math.round(totalTrees / donations.length * 10) / 10}
                </div>
                <div className="text-sm" style={{opacity: 0.9}}>Average Trees per Donation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Donations List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tree Donations Received</h2>
          
          {/* Summary Bar */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex flex-wrap justify-between items-center text-sm">
              <span className="text-green-700 font-medium">
                Showing {donations.length} donations totaling {totalTrees} trees
              </span>
              <span className="text-green-600">
                Latest donation: {new Date(donations[0]?.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Donations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {donations.map((donation) => (
              <div key={donation.tree_id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                    Tree #{donation.tree_id}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(donation.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-gray-700">Donor: </span>
                    <span className="text-gray-600">{donation.donor_name}</span>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">Email: </span>
                    <span className="text-gray-600 text-sm">{donation.donor_email}</span>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">Location: </span>
                    <span className="text-gray-600 text-sm">{donation.location}</span>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">Coordinates: </span>
                    <span className="text-gray-600 text-xs">
                      {parseFloat(donation.latitude).toFixed(4)}, {parseFloat(donation.longitude).toFixed(4)}
                    </span>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">Message: </span>
                    <span className="text-gray-600 text-sm" style={{fontStyle: 'italic'}}>"{donation.message}"</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      const googleMapsUrl = `https://www.google.com/maps?q=${donation.latitude},${donation.longitude}`;
                      window.open(googleMapsUrl, '_blank');
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    📍 View on Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoNGODashboard;