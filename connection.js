const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_CONN_URI);

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};