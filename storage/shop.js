module.exports = (sequelize, DataTypes) => {
	return sequelize.define('shop', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        cost: DataTypes.INTEGER,
    });
};