const express = require('express')
const postCRUD = require('../model/post');

const tagRouter = express.Router();

tagRouter.get('/', (req, res) => {
    res.send('OK')
})

tagRouter.get('/:tag', postCRUD.getPostByTag)

module.exports = tagRouter