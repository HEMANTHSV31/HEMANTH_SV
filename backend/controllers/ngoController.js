const db = require('../config/db');

// Get NGO's donations
const getNGODonations = async (req, res) => {
  const { ngoId } = req.params;
  
  try {
    if (!ngoId) {
      return res.status(400).json({
        success: false,
        message: 'NGO ID is required'
      });
    }

    // Get NGO details first
    const [ngoDetails] = await db.execute(
      'SELECT * FROM ngos WHERE ngo_id = ?',
      [ngoId]
    );

    if (ngoDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'NGO not found'
      });
    }

    // Get total trees donated to this NGO
    const [totalTreesResult] = await db.execute(
      'SELECT COUNT(*) as total_trees FROM trees WHERE ngo_id = ?',
      [ngoId]
    );

    const totalTrees = totalTreesResult[0].total_trees;

    // Get all donations to this NGO
    const [donations] = await db.execute(
      `SELECT 
        t.tree_id,
        t.donor_name,
        t.donor_email,
        t.latitude,
        t.longitude,
        t.location,
        t.message,
        t.created_at
      FROM trees t 
      WHERE t.ngo_id = ? 
      ORDER BY t.created_at DESC`,
      [ngoId]
    );

    res.status(200).json({
      success: true,
      data: {
        ngo: ngoDetails[0],
        totalTreesDonated: totalTrees,
        donations: donations
      }
    });

  } catch (error) {
    console.error('Error in getNGODonations:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
};

module.exports = {
  getNGODonations
};