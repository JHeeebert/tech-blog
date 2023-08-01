const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// Create the Post model
class Post extends Model {}
// Define the table columns and configuration
Post.init(
    {
        // TABLE COLUMN DEFINITIONS GO HERE
        // define an id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // define a title column
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define a post_text column
        post_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // define a user_id column
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);
// Export the model
module.exports = Post;
