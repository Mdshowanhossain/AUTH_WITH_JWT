const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const BlogData = require('../models/blog');

router.get('/', auth, async (req, res) => {
    try {


        const BlogData = await BlogData.find();
        // res.status(200).send(BlogData);
        console.log(BlogData)
    } catch (err) {
        res.status(500).send(err);
    }
})
router.post('/', auth, async (req, res) => {

    const { title, description, date } = req.body;
    try {
        const blogs = await new BlogData({
            title: title,
            description: description,
            date: date,
        });
        const blog = await blogs.save();
        res.status(200).send(blog);
    } catch (err) {
        res.status(500).send(err.message);
    }
})
router.put('/:id', auth, async (req, res) => {
    const { title, description, date } = req.body;
    try {
        const blogId = await req.params.id
        const updateBlog = {};
        if (title) updateBlog.title = title;
        if (description) updateBlog.description = description;
        if (date) updateBlog.date = date;
        const update = await BlogData.findByIdAndUpdate(blogId, { $set: updateBlog }, { new: true });
        res.status(200).send(update);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

router.delete('/:id', auth, async (req, res) => {
    const blogId = req.params.id;
    try {
        await BlogData.findByIdAndDelete(blogId)
        res.status(200).send('Delete SuccessFul');
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router