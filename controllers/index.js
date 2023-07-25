// Initialize the router
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
// Route the routes to their respective files
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
// Route to render the 404 page if no other routes are hit
router.use((req, res) => {
    res.status(404).end();
});
// Export the router
module.exports = router;