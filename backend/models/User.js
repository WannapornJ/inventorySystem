module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING(800)
        },
        salary: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM('hiring', 'quit'),
            defaultValue: 'hiring'
        },
        isAdmin: {
            type: DataTypes.ENUM('0', '1'),
            defaultValue: '0'
        },
        assign_to_store_id: {
            type: DataTypes.STRING
        }
    })

    model.associate = models => {
        model.hasOne(models.Store, { foreignKey: 'user_id' });
    }

    return model;
}