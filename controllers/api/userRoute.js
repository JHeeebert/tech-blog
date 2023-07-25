const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const session = require('express-session');
const Sequelizestore = require('connect-session-sequelize')(session.Store);
// Route to get all posts
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.error(err);
        res.status(500).json({ Error: "Server Error" });
    }
    );
});
// Route to get a user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'post_text',
                    'created_at'
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
                    model: Post,
                    attributes: [
                        'title'
                    ]
                }
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        res.json(dbUserData);
    }   
    )
    .catch(err => {
        console.error(err);
        res.status(500).json({ Error: "Server Error" });
    }
    );
});
// Route to create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        }
        );
    }
    )
    .catch(err => {
        console.error(err);
        res.status(500).json({ Error: "Server Error" });
    }
    );
}
);
// Route to login a user
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: "Username Not Found" });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: "Password Incorrect, Try Again!" });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: "Logged In + Session Saved" });
        }
        );
    }
    );
}
);
// Route to logout a user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        }
        );
    } else {
        res.status(404).end();
    }
}
);
// Route to update a user by id
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        res.json(dbUserData);
    }
    )
    .catch(err => {
        console.error(err);
        res.status(500).json({ Error: "Server Error" });
    }
    );
}
);
// Route to delete a user by id
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        res.json(dbUserData);
    }
    )
    .catch(err => {
        console.error(err);
        res.status(500).json({ Error: "Server Error" });
    }
    );
}
);
// Export the router
module.exports = router;
