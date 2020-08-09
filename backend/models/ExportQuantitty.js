module.exports = (sequelize, DataType) => {
    const model = sequelize.define('Export', {
        quantity: {
            type: DataType.INTEGER,
            defaultValue: 0
        }
    });
    
    model.associate = models => {
        model.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
    
    return model;
}