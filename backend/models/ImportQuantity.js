module.exports = (sequelize, DataType) => {
    const model = sequelize.define('Import', {
        quantity: {
            type: DataType.STRING,
            defaultValue: 0
        }
    });
    
    model.associate = models => {
        model.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
    
    return model;
}