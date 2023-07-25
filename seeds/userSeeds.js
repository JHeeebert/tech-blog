// Purpose: to seed the database with sample user data
const { User } = require('../models');
// sample user data to seed the database
const userData = [
    {
        username: "testuser1",
        email: "testuser1@email",
        password: "password1"
    },
    {
        username: "testuser2",
        email: "testuser2@email",
        password: "password2"
    },
    {
        username: "testuser3",
        email: "testuser3@email",
        password: "password3"
    },
    {
        username: "testuser4",
        email: "testuser4@email",
        password: "password4"
    },
    {
        username: "testuser5",
        email: "testuser5@email",
        password: "password5"
    },
    {
        username: "testuser6",
        email: "testuser6@email",
        password: "password6"
    }
];
// bulkCreate is a Sequelize method for inserting multiple records at once
const seedUsers = () => User.bulkCreate(userData);
// export the seedUsers function for use in index.js
module.exports = seedUsers;

