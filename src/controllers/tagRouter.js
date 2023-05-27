// 1. Get a list of common tag
// 2. Get all post by a specific tag

const express = require('express')
const postCRUD = require('../model/post');
const tagCRUD = require('../model/tag');
const authentication = require('./middleware');

const tagRouter = express.Router();
tagRouter.use(authentication)
// tagRouter.get('/', (req, res) => {
//     res.send('OK')
// })

// 1. Get a list of common tag
tagRouter.get('/%common', tagCRUD.getTop10)
// 2. Get all post by a specific tag
tagRouter.get('/:tag', postCRUD.getPostByTag)
module.exports = tagRouter