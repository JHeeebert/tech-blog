const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
// Route to get all posts
router.get('/',(req, res) => {
    Post.findAll({
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
                ]
            },
            {
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
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        console.log(posts);
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    }
    )
    .catch(err => {
        console.error(err);
        res.status(500).json({ Error: "Server Error" });
    }
    );
});
// Route to get a post by id
router.get('/post/:id', (req, res) => {
    Post.findOne({
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
                ]
            },
            {
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
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ Error: "No Post Found" });
            return;
        }
        const post = dbPostData.get({ plain: true });
        console.log(post);
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ Error: "Server Error" });
    });
}
);
// Route to render the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
}
);
// Route to render the signup page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
}
);  
// Export the router
module.exports = router;