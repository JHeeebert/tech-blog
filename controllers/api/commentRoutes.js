const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({Error: "Server Error"});
    }
});
// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
            });
            res.status(200).json(newComment);
        }
// If there is a server error, return a 500 status
    } catch (err) {
        console.error(err);
        res.status(500).json({Error: "Request Was Not Successful"});
    }
});
// Route to delete a comment by id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
// If no comment is found, return a 404 error message
if (!deletedComment) {
    res.status(404).json({message: "Comment Not Found"});
    return;    
}
// If comment is found, return a 200 status and the deleted comment
res.status(200).json(deletedComment);
// If there is a server error, return a 500 status
    } catch (err) {
        console.error(err);
        res.status(500).json({Error: "Server Error"});
    }
});
// Export the router
module.exports = router;

