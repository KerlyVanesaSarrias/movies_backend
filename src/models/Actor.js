const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Actor = sequelize.define('actors', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

module.exports = Actor;