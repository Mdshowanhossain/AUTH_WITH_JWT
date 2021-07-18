const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const todoSchema = require('../scema/todoScema');
const checkLogin = require('../middleweares/checkLogin');

const Todo = new mongoose.model("Todo", todoSchema);


router.get('/', checkLogin, (req, res) => {

    console.log(req.username);
    console.log(req.userId);

    Todo.find({ status: 'active' })
        .select({
            _id: 0,
            date: 0,
            _v: 0,
            data: 0
        })
        .limit(1)
        .exec((err, data) => {
            if (err) {
                error.status(500).json({
                    error: "There was a error",
                });
            } else {
                res.status(200).json({
                    result: data,
                    message: 'Todo get complete'
                })
            }

        })
})

router.post('/', async (req, res) => {

    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error"
            })
        } else {
            res.status(200).json({
                message: "Thank You created a new Data"
            })
        }
    });

})

router.post('/all', async (req, res) => {

    await Todo.insertMany(req.body, (err) => {

        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.status(200).json({
                message: "Todo was insertedMany Successfully"
            })
        }

    })

})

router.put('/:id', async (req, res) => {

    await Todo.findByIdAndUpdate({ _id: req.params.id },
        { $set: { status: 'active' } },
        {
            new: true,
            useFindAndModify: false,
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: "Update Failed"
                })
            } else {
                res.status(200).json({
                    message: "Update successfully"
                })
            }

        })


    // await Todo.updateOne({ _id: req.params.id }, { $set: { status: 'inactive' } }, (err) => {

    //     if (err) {
    //         res.status(500).json({
    //             error: "Update Failed"
    //         })
    //     } else {
    //         res.status(200).json({
    //             message: "Update successfully"
    //         })
    //     }

    // })




})

router.delete('/:id', async (req, res) => {

    await Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "Sorry not Deleted"
            })
        } else {
            res.status(200).json({
                message: "Delete successfully"
            })
        }
    })

})


module.exports = router;