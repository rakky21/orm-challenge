// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {
  static productCreate(body, models) {
  return models.Product.create({
    product_id: body.produc_id,
    tag_id: body.tag_id
  }).then(() => {
    return Post.findOne({
      where: {
        id: body.post_id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [
          sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
          'vote_count'
        ]
      ],
      include: [
        {
          model: models.Comment,
          attributes: ['id', 'comment_text', 'tag_id', 'product_id'],
          include: {
            model: models.User,
            attributes: ['username']
          }
        }
      ]
    });
  });
}}

// set up fields and rules for Product model
Product.init(
  {
    // define columns       
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
