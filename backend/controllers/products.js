const db = require("../models")
const { Op } = require('sequelize')

const newProduct = async (req, res) => {
    const { id } = req.user;
    const targetStore = await db.Store.findOne({
        where: {
            user_id: id
        }
    })

    let image = req.files.image_url;
    let fileExtension = image.name.split(".").slice(-1)[0];
    let filePath = `/${(new Date()).getTime()}.${fileExtension}`;

    image.mv(`images/products/${filePath}`);

    const { name, category, price, description } = req.body
    await db.Product.create({
        store_id: targetStore.dataValues.id,
        image_url: filePath,
        name,
        category,
        price,
        description,
    });
    res.status(201).send({ message: 'product created' })
}
const getAllProduct = async (req, res) => {
    const userId = Number(req.user.id);
    const storeId = await db.Store.findOne({
        where: { user_id: userId }
    });
    const productList = await db.Product.findAll({
        where: {
            store_id: storeId.dataValues.id
        }
    });
    res.status(200).send(productList);
}
const getOneProduct = async (req, res) => {
    const targetId = Number(req.params.id);
    const userId = req.user.id;
    const user = await db.User.findOne({
        where: {
            id: userId
        }
    });
    const assignStoreId = Number(user.dataValues.assign_to_store_id)
    const targetStore = await db.Store.findOne({
        where: {
            id: assignStoreId
        }
    });
    const storeId = targetStore.dataValues.id;
    const product = await db.Product.findOne({
        where: {
            [Op.and]: [
                { store_id: storeId },
                { id: targetId }
            ]
        },
        attributes: ['id', 'name', 'category', 'price', 'description', 'image_url', 'createdAt', 'updatedAt']
    });
    res.status(200).send(product.dataValues);
}
const editProduct = async (req, res) => {
    const { product_id } = req.params

    const product = await db.Product.findOne({
        where: {
            id: product_id
        }
    });

    let image = req.files.image_url;
    let fileExtension = image.name.split(".").slice(-1)[0];
    let filePath = `/${(new Date()).getTime()}.${fileExtension}`;

    image.mv(`images/products/${filePath}`);

    const { name, description, category, price } = req.body
    const updatedProduct = await product.update({
        image_url: filePath,
        description,
        category,
        price

    })

    res.status(200).send(updatedProduct)

}

const newImportQuantity = async (req, res) => {
    const userName = req.user.name;
    const productId = Number(req.params.product_id);
    const product = await db.Product.findOne({ where: { id: productId } })
    const quantityVal = await db.Import.findOne({
        where: {
            product_id: productId
        }
    });
    if (product !== null && productId === quantityVal.dataValues.product_id) {
        const { quantity } = req.body
        await db.Import.create({
            product_id: productId,
            quantity
        });
        res.status(201).send({ message: `product has stored by ${userName} at ${quantityImport}` })
    } else {
        res.status(404).send({ message: 'product not found' })
    }
}

const getAllImportQuantity = async (req, res) => {
    const productId = req.params.product_id;
    const product = await db.Product.findOne({
        where: {
            id: productId
        }
    });
    const quantityVal = await db.Import.findAll({
        where: {
            product_id: productId
        }
    });
    if (product !== null) {
        res.status(200).send({ quantityVal })
    } else {
        res.status(404).send({ message: 'product not found' })
    }
}
const updateImportQuantity = async (req, res) => {
    const { product_id, record_id } = req.params
    const product = await db.Product.findOne({
        where: {
            id: product_id
        }
    })
    const quantityVal = await db.Import.findOne({
        where: {
            [Op.and]: [
                { id: record_id },
                { product_id }
            ]
        }
    });
    const { quantity } = req.body

    const updateQuantity = await quantityVal.update({
        quantity
    })
    res.status(200).send({
        message: `${product.dataValues.name} has updated to ${updateQuantity.dataValues.quantity} units \n updated At ${quantityVal.dataValues.updatedAt}`
    })
}

const newExportQuantity = async (req, res) => {
    const userName = req.user.name;
    const productId = Number(req.params.product_id);
    const product = await db.Product.findOne({ where: { id: productId } })
    const quantityVal = await db.Export.findOne({
        where: {
            product_id: productId
        }
    });
    if (product !== null && productId === quantityVal.dataValues.product_id) {
        const { quantity } = req.body
        await db.Export.create({
            product_id: productId,
            quantity
        });
        res.status(201).send({ message: `product has picked up by ${userName} at ${quantityImport}` })
    } else {
        res.status(404).send({ message: 'product not found' })
    }
}
const getAllExportQuantity = async (req, res) => {
    const productId = req.params.product_id;
    const product = await db.Product.findOne({
        where: {
            id: productId
        }
    });
    const quantityVal = await db.Export.findAll({
        where: {
            product_id: productId
        }
    });
    if (product !== null) {
        res.status(200).send({ quantityVal })
    } else {
        res.status(404).send({ message: 'product not found' })
    }
}
const updateExportQuantity = async (req, res) => {
    const { product_id, record_id } = req.params
    const product = await db.Product.findOne({
        where: {
            id: product_id
        }
    })
    const quantityVal = await db.Export.findOne({
        where: {
            [Op.and]: [
                { id: record_id },
                { product_id }
            ]
        }
    });
    const { quantity } = req.body

    const updateQuantity = await quantityVal.update({
        quantity
    })
    res.status(200).send({
        message: `${product.dataValues.name} has updated to ${updateQuantity.dataValues.quantity} units \n updated At ${quantityVal.dataValues.updatedAt}`
    })
}

const getExistQuantity = async (req, res) => {
    const { product_id } = req.params;
    const importExist = await db.Import.findAll({
        where: {
            product_id
        },
        attributes: [['id', 'import_id'], 'quantity']
    })
    const exportExist = await db.Export.findAll({
        where: {
            product_id
        },
        attributes: [['id', 'export_id'], 'quantity']
    })
    res.status(200).send({
        import: importExist.map(obj => {
            return obj.dataValues
        }),
        export: exportExist.map(obj => {
            return obj.dataValues
        })
    })
    console.log(importExist)
    console.log(exportExist)
}

module.exports = {
    newProduct,
    getAllProduct,
    getOneProduct,
    editProduct,
    newImportQuantity,
    getAllImportQuantity,
    updateImportQuantity,
    newExportQuantity,
    getAllExportQuantity,
    updateExportQuantity,
    getExistQuantity,
    getExistQuantity
}