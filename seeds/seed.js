const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('../seeds/userSeeds.json');
const postData = require('../seeds/postSeeds.json');
const commentData = require('../seeds/commentSeeds.json');

const seedDatabase = async () => {
        try {
            await sequelize.sync({ force: true });
            await User.bulkCreate(userData, {
                individualHooks: true,
                returning: true,
            });
            await Post.bulkCreate(postData);
            await Comment.bulkCreate(commentData);
            process.exit(0);
        } catch (err) {
            console.error('Error seeding the database:', err);
            process.exit(1);
        }
    };

seedDatabase();