const {sequelize, Sequelize} = require('../connection');

class Product extends Sequelize.Model{}

Product.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    image_path: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
},  {
        sequelize,
        modelName: 'products',
        timestamps: false
});

module.exports = Product;