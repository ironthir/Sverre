module.exports = (sequelize, DataTypes) => {
        return sequelize.define('prefixes', {
            name: {
                type: DataTypes.STRING,
                unique: true,
            },
            serverPrefix: DataTypes.STRING,
        });
    };