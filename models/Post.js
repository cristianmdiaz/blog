const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Post extends Model {}

Post.init({
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Post' // We need to choose the model name
});

module.exports = Post;