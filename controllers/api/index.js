const router = require('express').Router();
const userRoutes = require('./userRoute');
const postRoutes = require('./postRoute');
const commentRoutes = require('./commentRoutes');
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

// Export the router
module.exports = router;
