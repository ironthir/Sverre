module.exports = (sequelize, DataTypes) => {
	return sequelize.define('inventory', {
        userID: DataTypes.STRING,
        itemname: DataTypes.STRING,
        equiped: DataTypes.BOOLEAN,
    });
};