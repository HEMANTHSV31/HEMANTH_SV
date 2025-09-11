import React, { useState, useEffect } from 'react';
import { ngoAPI } from '../services/api';

const NGODashboard = () => {
  const [ngoId, setNgoId] = useState('1'); // Default NGO ID - in real app, this would come from authentication
  const [ngoData, setNgoData] = useState(null);
  const [donations, setDonations] = useState([]);
  const [totalTrees, setTotalTrees] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch NGO donations on component mount and when ngoId changes
  useEffect(() => {
    fetchNGODonations();
  }, [ngoId]);

  const fetchNGODonations = async () => {
    try {
      setLoading(true);
      const response = await ngoAPI.getNGODonations(ngoId);
      const { ngo, totalTreesDonated, donations } = response.data.data;
      
      setNgoData(ngo);
      setTotalTrees(totalTreesDonated);
      setDonations(donations);
    } catch (error) {
      console.error('Error fetching NGO donations:', error);
      alert('Failed to fetch NGO data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNgoChange = (e) => {
    setNgoId(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
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
            <button
              onClick={fetchNGODonations}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Refreshing...' : '🔄 Refresh'}
            </button>
          </div>
          
          <select
            value={ngoId}
            onChange={handleNgoChange}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Green Earth Foundation</option>
            <option value="2">Tree Plantation Society</option>
            <option value="3">Nature Conservation Trust</option>
            <option value="4">Eco Warriors NGO</option>
            <option value="5">Save Trees Initiative</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading NGO data...</p>
          </div>
        ) : (
          <>
            {/* NGO Info & Stats */}
            {ngoData && (
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
                <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                  <h2 className="text-2xl font-bold mb-4">🌳 Impact Statistics</h2>
                  <div className="space-y-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <div className="text-3xl font-bold">{totalTrees}</div>
                      <div className="text-sm opacity-90">Total Trees Donated</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <div className="text-3xl font-bold">{donations.length}</div>
                      <div className="text-sm opacity-90">Total Donations Received</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <div className="text-3xl font-bold">
                        {donations.length > 0 ? Math.round(totalTrees / donations.length * 10) / 10 : 0}
                      </div>
                      <div className="text-sm opacity-90">Average Trees per Donation</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Donations List */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Tree Donations Received</h2>
              
              {donations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🌱</div>
                  <p className="text-gray-500 text-lg">No donations received yet</p>
                  <p className="text-gray-400">When people donate trees, they will appear here</p>
                </div>
              ) : (
                <>
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
                      <div key={donation.tree_id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
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
                          
                          {donation.message && (
                            <div>
                              <span className="font-semibold text-gray-700">Message: </span>
                              <span className="text-gray-600 text-sm italic">"{donation.message}"</span>
                            </div>
                          )}
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

                  {/* Load More Button (for future pagination) */}
                  {donations.length >= 10 && (
                    <div className="text-center mt-6">
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors">
                        Load More Donations
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NGODashboard;