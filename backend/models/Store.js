module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Store', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    model.associate = models => {
        model.belongsTo(models.User, { foreignKey: 'user_id' });
        model.hasMany(models.Product, { foreignKey: 'store_id' });
    }
    
    return model;
}