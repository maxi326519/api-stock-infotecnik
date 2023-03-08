const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Products', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        dificulty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        season: {
            type: DataTypes.ENUM('Spring', 'Summer', 'Autum', 'Winter', 'All year'),
            allowNull: false
        }
    });
};