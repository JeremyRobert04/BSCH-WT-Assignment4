const { Sequelize, DataTypes } = require('sequelize');
const Topic = require('./topic');

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Define SubTopic model
const SubTopic = sequelize.define('SubTopic', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    topicId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Topics', // Reference the Topic model
            key: 'id',       // Use the 'id' field as the foreign key
        },
        allowNull: false, // Ensure each SubTopic has a Topic
    },
});

Topic.hasMany(SubTopic, { foreignKey: 'topicId', onDelete: 'CASCADE' }); // A Topic can have many SubTopics
SubTopic.belongsTo(Topic, { foreignKey: 'topicId' }); // Each SubTopic belongs to a specific Topic

// Synchronize model with database
SubTopic.sync();

module.exports = SubTopic;