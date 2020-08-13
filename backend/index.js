require('dotenv').config();
require('./config/passport');

const express = require('express');
const db = require('./models');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const productRoutes = require('./routes/products');
const storeRoutes = require('./routes/store');
const userRoutes = require('./routes/user');

const app = express();


let allowedOrigins = ['http://localhost:3000']

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            let message = 'non-authorization'
            return callback(new Error(message), false)
        }
        return callback(null, true)
    }
}));
app.use(fileUpload());
app.use(express.static('./images'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/products', productRoutes);
app.use('/store', storeRoutes);
app.use('/users', userRoutes);

db.sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running at ${process.env.PORT}`);
    });
});