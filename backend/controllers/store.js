const db = require("../models");
const { Op } = require('sequelize');

const createNewStore = async (req, res) => {
    const { name } = req.body;
    const { isAdmin, id } = req.user;
    const storeInDb = await db.Store.findAll({
        where: { user_id: id }
    })

    if (isAdmin === '1') {
        if (storeInDb.length === 0) {
            const newStore = await db.Store.create({
                user_id: req.user.id,
                name
            });
            res.status(201).send({
                message: 'store created successfully',
                newStore
            })
        } else {
            res.status(400).send({
                message: 'store must have only one store'
            })
        }
    } else {
        res.status(401).send({
            message: 'you do not have a permission'
        });
    }
}

const getStoreProfile = async (req, res) => {
    const targetStoreId = await db.User.findOne({
        where: {
            id: req.user.id
        },
        attributes: ['assign_to_store_id']
    });
    const storeDetail = await db.Store.findAll({
        where: {
        id : targetStoreId.dataValues.assign_to_store_id
    }});
    res.status(200).send(storeDetail);
}

const removeStore = async (req, res) => {
    const { isAdmin, id } = req.user;
    const targetStoreId = Number(req.params.id);
    const targetStore = await db.Store.findOne({
        where: {
            [Op.and]: [
                { id: targetStoreId },
                { user_id: id }
            ]
        }
    });

    if (isAdmin === '1' && targetStore) {
        await targetStore.destroy();
        res.status(204).send();
    } else {
        res.status(401).send();
    }
}

module.exports = {
    createNewStore,
    getStoreProfile,
    removeStore
}