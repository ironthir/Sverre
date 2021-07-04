module.exports = (sequelize, DataTypes) => {
	return sequelize.define('money', {
        userID: {
            type: DataTypes.STRING,
            unique: true,
        },
        balance: DataTypes.INTEGER,
    });
};