const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const config = require('./config.js')

const productRoute = require('./routes/product.route.js')
const authRoute = require('./routes/auth.route.js');

const app = express();

// middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes

app.use('/api/products', productRoute);
app.use('/api/auth', authRoute)

mongoose.connect(`mongodb+srv://markszeibert_db_user:${config.MONGODB_PASSWORD}@cluster0.chhz4jc.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    console.log("Connected to the database succesfully!");
    app.listen(config.PORT, () => {
        console.log(`Server is running at port ${config.PORT}`);
    });
})
.catch(() => {
    console.log("Connection failed.");
});