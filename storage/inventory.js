module.exports = (sequelize, DataTypes) => {
	return sequelize.define('inventory', {
        userID: DataTypes.STRING,
        itemname: DataTypes.STRING,
        equipped: DataTypes.BOOLEAN,
    });
};