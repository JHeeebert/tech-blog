const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
// Route to get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {   
                user_id: req.session.user_id
            },
            attributes: ["id", "title", "post_text", "created_at"],
            include: [
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"]
                    },
                },
                {
                    model: User,
                    attributes: ["username"]
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("dashboard", { posts, loggedIn: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Server Error" });
    }
});
// Route to get a post by id
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ["id", "title", "post_text", "created_at"],
            include: [
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"]
                    },
                },
                {
                    model: User,
                    attributes: ["username"]
                },
            ],
        });
        if (!postData) {
            res.status(404).json({ message: "Post Not Found" });
            return;
        }
        const post = postData.get({ plain: true });
        res.render("edit-post", { post, loggedIn: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Server Error" });
    }
});
//
router.get("/edituser", withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            },
            attributes: { exclude: ["password"] }
        });
        if (!userData) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        const user = userData.get({ plain: true });
        res.render("edit-user", { user, loggedIn: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Server Error" });
    }
});
module.exports = router;