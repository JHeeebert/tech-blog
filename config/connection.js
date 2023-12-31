// This file is used to connect to the database
const Sequelize = require('sequelize')
require('dotenv').config();

// This is used to connect to the database
let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            // This is used to connect to the database
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}
// Export the connection
module.exports = sequelize;
