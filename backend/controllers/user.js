const db = require("../models");
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const register = async (req, res) => {
    const { name, surname, username, password } = req.body;
    const targetUser = await db.User.findOne({ where: { username } });

    if (targetUser) {
        res.status(400).send({ message: 'Username already used' });
    } else {
        const salt = bc.genSaltSync(Number(process.env.ROUNDS));
        const hashPassword = bc.hashSync(password, salt);

        await db.User.create({
            password: hashPassword,
            name,
            surname,
            username
        });
        res.status(201).send({ message: 'user created' });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const targetUser = await db.User.findOne({ where: { username } });

    if (targetUser) {
        const isRightPassword = bc.compareSync(password, targetUser.password);

        if (isRightPassword) {
            const payload = { id: targetUser.id, name: targetUser.name, admin: targetUser.isAdmin };
            const token = jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 86400 });

            res.status(200).send({
                message: 'login successfully',
                access_token: token,
                accessToken: token
            })
        } else {
            res.status(400).send({ message: 'username or password is wrong' });
        }
    } else {
        res.status(400).send({ message: 'username or password is wrong' });
    }
}

const getAllProfile = async (req, res) => {
    const { id, isAdmin } = req.user
    const storeId = await db.Store.findOne({
        where: {
            user_id: id
        },
        attributes: ['id', 'user_id']
    })

    if (isAdmin === '1') {
        const profileLists = await db.User.findAll({
            where: {
                assign_to_store_id: storeId.dataValues.id
            },
            attributes: [['id', 'user_id'], 'name', 'surname', 'username', 'image_url', 'isAdmin', 'status', 'assign_to_store_id']
        });
        res.status(200).send(profileLists);
    } else {
        res.status(401).send({ message: 'you need a permission to do this action' })
    }
}

const getOwnProfile = async (req, res) => {
    const profileDetail = await db.User.findOne({
        where: { id: req.user.id },
        attributes: [['id', 'user_id'], 'name', 'surname', 'username', 'image_url', 'isAdmin', 'status', 'assign_to_store_id']
    });
    res.status(200).send(profileDetail);
}

const editProfile = async (req, res) => {
    const { id, isAdmin } = req.user;
    const targetId = Number(req.params.id);
    let targetUpdate = await db.User.findOne({ where: { id: targetId } });
    const adminStore = await db.User.findOne({
        where: {
            id : id
        },
        attributes: ['assign_to_store_id']
    })
    const store = await db.Store.findOne({
        where: {
            user_id: id
        },
        attributes: [['id', 'store_id']]
    })
    const assignStoreId = adminStore.dataValues.assign_to_store_id;
    const storeId = store.dataValues.store_id;

    if (id !== targetId && isAdmin === '0') {
        res.status(401).send({ message: 'You do not have a permission' })
    } else if (id === targetId && isAdmin === '0') {
        const {username} = req.body
        let image = req.files.image_url;
        let fileExtension = image.name.split(".").slice(-1)[0];
        let filePath = `/${(new Date()).getTime()}.${fileExtension}`;

        image.mv(`images/${filePath}`);

        const newPost = await db.Post.create({
            image_url: filePath,
            username
        });

        res.status(201).send(newPost);
    } else if (isAdmin === '1' && Number(assignStoreId) === storeId) {
        try {
            const {name, surname, salary, isAdmin, assign_to_store_id } = req.body

            const newProfile = await targetUpdate.update({
                name,
                surname,
                salary,
                isAdmin,
                assign_to_store_id
            })

            res.status(200).send({
                message: 'already updated',
                newProfile
            })
        } catch (err) {
            res.status(400).send(err)
        }
    }
}

const disableProfile = async (req, res) => {
    const { isAdmin } = req.user
    const targetAccount = await db.User.findOne({
        where: {
            [Op.and]: [
                { id: req.params.id },
                { status: 'hiring' }
            ]
        }
    })

    if (targetAccount && isAdmin === '1') {
        await targetAccount.update({ status: 'quit' });
        res.status(200).send({ message: 'success' })
    } else {
        res.status(400).send({ message: 'something went wrong' })
    }
}

module.exports = {
    register,
    login,
    getAllProfile,
    getOwnProfile,
    editProfile,
    disableProfile
}