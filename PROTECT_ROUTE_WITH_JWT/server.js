const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db/db')
// require('./db/db');

// const auth = require('auth')
const blog = require('./routes/blog');
const Registration = require('./routes/registration');



require('dotenv').config();
const PORT = process.env.PORT || 5000

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser());
app.use(cors());

// <========DATABASE CONNECTION========>
connectDB();

// <===========ROUTER ===========>

app.use('/blog', blog);
app.use('/', Registration)






app.listen(PORT, () => {
    console.log('Your Server is Running at', PORT)
})