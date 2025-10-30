const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config.js')

const productRoute = require('./routes/product.route.js')
const authRoute = require('./routes/auth.route.js');

const app = express();

// middleware

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes

app.use('/api/products', productRoute);
app.use('/api/auth', authRoute);

mongoose.connect(config.MONGO_URI)
.then(() => {
    console.log("Connected to the database succesfully!");
    app.listen(config.PORT, () => {
        console.log(`Server is running at port ${config.PORT}`);
    });
})
.catch(() => {
    console.log("Connection failed.");
});