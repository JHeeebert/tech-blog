const { User } = require('../models');

const userData = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "Johndoe@example.com",
        "password": "password12345"
    },
    {
        "id": 2,
        "name": "Jane Doe",
        "email": "Janedoe@example.com",
        "password": "password123456"
    },
    {
        "id": 3,
        "name": "John Smith",
        "email": "Johnsmith@example.com",
        "password": "password1234567"
    },
    {
        "id": 4,
        "name": "Jane Smith",
        "email": "Janesmith@example.com",
        "password": "password12345678"
    },
    {
        "id": 5,
        "name": "Billy Strings",
        "email": "Billystrings@example.com",
        "password": "password123456789"
    },
    {
        "id": 6,
        "name": "Billy Bob",
        "email": "Billybob@example.com",
        "password": "password1234567890"
    }
]

const seedUsers = () => User.bulkCreate(userData); 
module.exports = seedUsers;