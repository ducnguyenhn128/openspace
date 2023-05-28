// ============================================================================
// Profile User (Other user)
// 1. Get a profile: /user/:id
// 2. Follow an user /user/:id/follow
// 3. Unfollow an user /user/:id/unfollow

const express = require('express');
const morgan = require('morgan')
morgan('short');
const {authentication} = require('./middleware');
const profileCRUD = require('../model/profile')


const profileRouter = express.Router();

profileRouter.use(authentication)

profileRouter.get('/:id', profileCRUD.getAnUser)
profileRouter.post('/:id/follow', profileCRUD.followAnUser)
profileRouter.delete('/:id/follow', profileCRUD.unfollow)

module.exports = profileRouter;