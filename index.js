const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userHandler = require('./routeHandler/userHandler');
const todoHandler = require('./routeHandler/todoHandler');

const app = express();
dotenv.config();
app.use(express.json());

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connection successful'))
    .catch(err => console.log(err));


app.use('/todo', todoHandler);

app.get('/ame', (req, res) => {
    res.send('i am home')
})

app.use('/users', userHandler);

const errorHandler = (err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    } else {
        res.status(500).json({ error: err })
    }
}
app.use(errorHandler);

app.listen(4000, () => {
    console.log(`Your server is running at 4000`)
});




