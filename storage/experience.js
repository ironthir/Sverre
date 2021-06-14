module.exports = (sequelize, DataTypes) => {
	return sequelize.define('experience', {
        serverid: DataTypes.STRING,
        userid: DataTypes.STRING,
        points: DataTypes.NUMBER,
        level: DataTypes.NUMBER,
    });
};