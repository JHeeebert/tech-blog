const { Comment } = require('../models');
// sample comment data to seed the database
const commentData = [
    {
        comment_text: "This is a test comment 1",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "This is a test comment 2",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "This is a test comment 3",
        user_id: 3,
        post_id: 3
    },
    {
        comment_text: "This is a test comment 4",
        user_id: 4,
        post_id: 4
    },
    {
        comment_text: "This is a test comment 5",
        user_id: 5,
        post_id: 5
    },
    {
        comment_text: "This is a test comment 6",
        user_id: 6,
        post_id: 6
    }
];
// bulkCreate is a Sequelize method for inserting multiple records at once
const seedComments = () => Comment.bulkCreate(commentData);
// export the seedComments function for use in index.js
module.exports = seedComments;
