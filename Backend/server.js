const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose'); // optional


const productsRoute = require('./routes/product.js');
const cartRoute = require('./routes/cart');


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));


// Optional MongoDB connection (uncomment if using DB)
/*
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error(err));
*/