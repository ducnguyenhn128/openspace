const express = require('express')
const postCRUD = require('../model/post');

const tagRouter = express.Router();
tagRouter.get('/:tag', postCRUD.getPostByTag)

module.exports = tagRouter