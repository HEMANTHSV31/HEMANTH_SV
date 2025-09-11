const express = require('express');
const router = express.Router();
const { getNGODonations } = require('../controllers/ngoController');

// GET /api/ngos/my-donations/:ngoId
router.get('/my-donations/:ngoId', getNGODonations);

module.exports = router;