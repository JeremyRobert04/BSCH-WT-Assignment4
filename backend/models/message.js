const { Sequelize, DataTypes } = require('sequelize');
const User = require('./user');
const SubTopic = require('./subTopic');

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Define Message model
const Message = sequelize.define('Message', {
    // Model attributes are defined here
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // Foreign key to User
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // Reference the User model
            key: 'userId',       // Use the 'id' field as the foreign key
        },
        allowNull: false, // Ensure each Message has a User
    },
    // Foreign key to SubTopic
    subTopicId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'SubTopics', // Reference the SubTopic model
            key: 'id',          // Use the 'id' field as the foreign key
        },
        allowNull: false, // Ensure each Message has a SubTopic
    },
    upVotes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
});

User.hasMany(Message, { foreignKey: 'userId', onDelete: 'CASCADE' }); // A User can have many Messages
Message.belongsTo(User, { foreignKey: 'userId' }); // Each Message belongs to a specific User

SubTopic.hasMany(Message, { foreignKey: 'subTopicId', onDelete: 'CASCADE' }); // A SubTopic can have many Messages
Message.belongsTo(SubTopic, { foreignKey: 'subTopicId' }); // Each Message belongs to a specific SubTopic

// Synchronize model with database
Message.sync();

module.exports = Message;