// Purpose: to seed the database with sample post data
const { Post } = require('../models');
// sample post data to seed the database
const postData = [
    {
        title: "test post 1",
        post_content: "This is a test post 1",
        user_id: 1
    },
    {
        title: "test post 2",
        post_content: "This is a test post 2",
        user_id: 2
    },
    {
        title: "test post 3",
        post_content: "This is a test post 3",
        user_id: 3
    },
    {
        title: "test post 4",
        post_content: "This is a test post 4",
        user_id: 4
    },
    {
        title: "test post 5",
        post_content: "This is a test post 5",
        user_id: 5
    },
    {
        title: "test post 6",
        post_content: "This is a test post 6",
        user_id: 6
    }
];
// bulkCreate is a Sequelize method for inserting multiple records at once
const seedPosts = () => Post.bulkCreate(postData);
// export the seedPosts function for use in index.js
module.exports = seedPosts;
