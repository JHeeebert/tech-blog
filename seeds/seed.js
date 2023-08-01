const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('../seeds/userSeeds.json');
const postData = require('../seeds/postSeeds.json');
const commentData = require('../seeds/commentSeeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    await Post.bulkCreate(postData);
    await Comment.bulkCreate(commentData);
    process.exit(0);
};
    seedDatabase().then(() => {
        process.exit(0);
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    });
// Run the following command to seed the database:
// npm run seed
// Run the following command to start the application:
// npm start
// Run the following command to start the application in development mode:
// npm run watch
// Run the following command to run the tests:
// npm run test