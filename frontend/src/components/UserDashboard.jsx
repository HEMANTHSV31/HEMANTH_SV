import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';

const UserDashboard = () => {
  const [userTrees, setUserTrees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [donationResult, setDonationResult] = useState(null);
  const [formData, setFormData] = useState({
    userId: '1', // Default user ID - in real app, this would come from authentication
    name: '',
    email: '',
    location: '',
    numberOfTrees: 1,
    message: '',
    latitude: null,
    longitude: null
  });

  // Fetch user's trees on component mount
  useEffect(() => {
    fetchUserTrees();
  }, []);

  const fetchUserTrees = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUserTrees(formData.userId);
      setUserTrees(response.data.data.trees);
    } catch (error) {
      console.error('Error fetching user trees:', error);
      alert('Failed to fetch your trees. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  };

  // Open donation modal and get location
  const openDonationModal = async () => {
    try {
      setLoading(true);
      const location = await getCurrentLocation();
      setFormData(prev => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude
      }));
      setShowModal(true);
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Unable to get your location. Please enable location services and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit donation
  const handleSubmitDonation = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Validate required fields
      if (!formData.name || !formData.email || !formData.location) {
        alert('Please fill in all required fields.');
        return;
      }

      const response = await userAPI.donateTree(formData);
      setDonationResult(response.data.data);
      setShowModal(false);
      setShowSuccess(true);
      
      // Reset form
      setFormData(prev => ({
        ...prev,
        name: '',
        email: '',
        location: '',
        numberOfTrees: 1,
        message: '',
        latitude: null,
        longitude: null
      }));

      // Refresh trees list
      fetchUserTrees();
    } catch (error) {
      console.error('Error donating tree:', error);
      alert(error.response?.data?.message || 'Failed to donate tree. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Close success modal and show trees again
  const handleSuccessClose = () => {
    setShowSuccess(false);
    setDonationResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
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
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Getting Location...' : '🌱 Donate Tree'}
          </button>
          <button
            onClick={fetchUserTrees}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔄 View My Donations
          </button>
        </div>

        {/* User Trees List */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Donated Trees ({userTrees.length})</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-2 text-gray-600">Loading your trees...</p>
            </div>
          ) : userTrees.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🌱</div>
              <p className="text-gray-500">You haven't donated any trees yet. Start making a difference today!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTrees.map((tree) => (
                <div key={tree.tree_id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
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
                    {tree.message && (
                      <p><strong>Message:</strong> {tree.message}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Donation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
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
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
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
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
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
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
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
                      name="numberOfTrees"
                      value={formData.numberOfTrees}
                      onChange={handleInputChange}
                      min="1"
                      max="100"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Add a message with your donation..."
                    />
                  </div>

                  {formData.latitude && formData.longitude && (
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="text-sm text-green-700">
                        📍 Location detected: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                      </p>
                    </div>
                  )}

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
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Donating...' : 'Donate Trees'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccess && donationResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-green-800 mb-4">Donation Successful!</h3>
                
                <div className="bg-green-50 p-4 rounded-lg mb-4 text-left">
                  <p className="text-sm text-green-700 mb-2">
                    <strong>Trees Donated:</strong> {donationResult.numberOfTrees}
                  </p>
                  <p className="text-sm text-green-700 mb-2">
                    <strong>Assigned NGO:</strong> {donationResult.assignedNGO.name}
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>NGO Location:</strong> {donationResult.assignedNGO.location}
                  </p>
                </div>

                <p className="text-gray-600 mb-6">
                  Thank you for making a difference! Your trees have been assigned to the nearest NGO for planting.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={openDonationModal}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Donate Again
                  </button>
                  <button
                    onClick={handleSuccessClose}
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

export default UserDashboard;