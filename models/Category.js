const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model { }

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  },
  // hooks: {
  //   // set up beforeCreate lifecycle "hook" functionality
  //   async beforeCreate(newUserData) {
  //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
  //     return newUserData;
  //   },

  //   async beforeUpdate(updatedUserData) {
  //     updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
  //     return updatedUserData;
  //   }
);

module.exports = Category;
