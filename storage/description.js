module.exports = (sequelize, DataTypes) => {
	return sequelize.define('description', {
        userid: {
            type: DataTypes.STRING,
            unique: true,
        },
        desc: DataTypes.STRING,
    });
};