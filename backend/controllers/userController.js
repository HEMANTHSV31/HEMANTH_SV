const db = require('../config/db');

// Haversine formula to calculate distance between two points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

// Find nearest NGO using Haversine formula
const findNearestNGO = async (latitude, longitude) => {
  try {
    const [ngos] = await db.execute('SELECT * FROM ngos');
    
    let nearestNGO = null;
    let minDistance = Infinity;
    
    ngos.forEach(ngo => {
      const distance = calculateDistance(latitude, longitude, ngo.latitude, ngo.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearestNGO = ngo;
      }
    });
    
    return nearestNGO;
  } catch (error) {
    throw new Error('Error finding nearest NGO: ' + error.message);
  }
};

// Donate tree endpoint
const donateTree = async (req, res) => {
  const { userId, latitude, longitude, name, email, location, numberOfTrees, message } = req.body;
  
  try {
    // Validate required fields
    if (!userId || !latitude || !longitude || !name || !email || !location || !numberOfTrees) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Validate number of trees
    if (numberOfTrees <= 0 || numberOfTrees > 100) {
      return res.status(400).json({
        success: false,
        message: 'Number of trees must be between 1 and 100'
      });
    }

    // Check if user exists, if not create user
    let [existingUser] = await db.execute(
      'SELECT * FROM users WHERE user_id = ? OR email = ?',
      [userId, email]
    );

    if (existingUser.length === 0) {
      await db.execute(
        'INSERT INTO users (user_id, name, email) VALUES (?, ?, ?)',
        [userId, name, email]
      );
    }

    // Find nearest NGO
    const nearestNGO = await findNearestNGO(parseFloat(latitude), parseFloat(longitude));
    
    if (!nearestNGO) {
      return res.status(500).json({
        success: false,
        message: 'No NGO found for tree assignment'
      });
    }

    // Insert tree records for each tree donated
    const treeIds = [];
    for (let i = 0; i < numberOfTrees; i++) {
      const [result] = await db.execute(
        `INSERT INTO trees (user_id, ngo_id, donor_name, donor_email, latitude, longitude, location, message) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, nearestNGO.ngo_id, name, email, latitude, longitude, location, message]
      );
      treeIds.push(result.insertId);
    }

    res.status(201).json({
      success: true,
      message: `Successfully donated ${numberOfTrees} tree(s)`,
      data: {
        treeIds: treeIds,
        numberOfTrees: numberOfTrees,
        assignedNGO: {
          id: nearestNGO.ngo_id,
          name: nearestNGO.name,
          location: nearestNGO.address
        },
        donorInfo: {
          name: name,
          email: email,
          location: location
        }
      }
    });

  } catch (error) {
    console.error('Error in donateTree:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
};

// Get user's donated trees
const getUserTrees = async (req, res) => {
  const { userId } = req.params;
  
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const [trees] = await db.execute(
      `SELECT 
        t.tree_id,
        t.donor_name,
        t.donor_email,
        t.latitude,
        t.longitude,
        t.location,
        t.message,
        t.created_at,
        n.ngo_id,
        n.name as ngo_name,
        n.address as ngo_address,
        n.contact_email as ngo_email,
        n.phone as ngo_phone
      FROM trees t 
      JOIN ngos n ON t.ngo_id = n.ngo_id 
      WHERE t.user_id = ? 
      ORDER BY t.created_at DESC`,
      [userId]
    );

    res.status(200).json({
      success: true,
      data: {
        totalTrees: trees.length,
        trees: trees
      }
    });

  } catch (error) {
    console.error('Error in getUserTrees:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
};

module.exports = {
  donateTree,
  getUserTrees
};