const express = require('express');
const router = express.Router();
const { donateTree, getUserTrees } = require('../controllers/userController');

// POST /api/users/donate-tree
router.post('/donate-tree', donateTree);

// GET /api/users/my-trees/:userId
router.get('/my-trees/:userId', getUserTrees);

module.exports = router;