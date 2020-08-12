module.exports = (sequelize, DataType) => {
    const model = sequelize.define('Product', {
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        category: {
            type: DataType.STRING,
            allowNull: false
        },
        price: {
            type: DataType.STRING,
            defaultValue: 0
        },
        description: {
            type: DataType.STRING(1200)
        },
        image_url: {
            type: DataType.STRING(800),
            allowNull: false
        }
    });

    model.associate = models => {
        model.belongsTo(models.Store, { foreignKey: 'store_id' });
        model.hasMany(models.Import, { foreignKey: 'product_id' });
        model.hasMany(models.Export, { foreignKey: 'product_id' });
    }

    return model;
}