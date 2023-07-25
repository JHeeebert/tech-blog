const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: [
                'id',
                'title',
                'post_text',
                'created_at'
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: [
                        'username'
                    ],
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: [ 'username' ]
                    }
                }
            ]
        });
    res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Server Error" });
    }
});
// Route to get a post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'post_text',
                'created_at'
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        'username'
                    ],
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: [ 'username' ]
                    }
                }
            ]
        });
// If no post is found, return a 404 error message
if (!post) {
    res.status(404).json({message: "Post Not Found"});
    return;
}
// If post is found, return a 200 status and the post
res.status(200).json(post);
// If there is a server error, return a 500 status
    } catch (err) {
        console.error(err);
        res.status(500).json({Error: "Server Error"});
    }
}); 
// Route to create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
                    title: req.body.title,
                    post_text: req.body.post_text,
                    user_id: req.session.user_id
                });
                res.status(200).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({Error: "Server Error"});
    }
});
// Route to update a post by id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id
            },
        });
// If no post is found, return a 404 error message
if (!updatedPost[0]) {
    res.status(404).json({message: "Post Not Found"});
    return;
}
// If post is found, return a 200 status and the updated post
res.status(200).json(updatedPost);
// If there is a server error, return a 500 status
    } catch (err) {
        console.error(err);
        res.status(500).json({Error: "Server Error"});
    }
});
// Route to delete a post by id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
// If no post is found, return a 404 error message
if (!deletedPost) {
    res.status(404).json({message: "Post Not Found"});
    return;    
}
// If post is found, return a 200 status and the deleted post
res.status(200).json(deletedPost);
// If there is a server error, return a 500 status
    } catch (err) {
        console.error(err);
        res.status(500).json({Error: "Server Error"});
    }
});
// Export the router
module.exports = router;