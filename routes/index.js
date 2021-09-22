const router = require('express').Router();
// Import all of the API routes from /api/index.js (no need for index.js since it's implied)
const apiRoutes = require('./api');

// Add prefix of '/api' to all of the routes imported from the api directory
router.use('/api', apiRoutes);

// exproting... ... ...
module.exports = router;