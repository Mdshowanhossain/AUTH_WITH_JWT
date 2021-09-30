const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Registration = require('../models/registration');

router.get('/', (req, res) => {
    res.send('HEllo')
    console.log(req.body);
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    try {
        const users = await new Registration({
            username: username,
            email: email,
            password: hashPassword
        })

        const newUser = await users.save();
        res.send(newUser);

        const payload = {
            users: {
                _id: newUser._id,
                username: newUser.username
            }
        }
        const jwtToken = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' })
        res.status(200).send(jwtToken);
    } catch (err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Registration.findOne({ email });

        if (!user) {
            res.status(400).send('Invalid Credentials')
        }
        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            res.status(400).send('Invalid Credentials')
        }

        const payload = {
            user: {
                _id: user._id,
                user: user.username
            }
        }

        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });
        res.status(200).send(jwtToken);

    } catch (err) {
        res.status(401).send(err.message)
    }
});

module.exports = router;