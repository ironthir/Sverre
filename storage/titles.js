module.exports = (sequelize, DataTypes) => {
	return sequelize.define('titles', {
        userid: {
            type: DataTypes.STRING,
            unique: true,
        },
        title: DataTypes.STRING,
    });
};