// ============================================================================
// Post Router: /post
// 1. Get recent post from user you follow: DONE
// 2. Get recent post globally : DONE
// 3. Create a post: /post : DONE
// 4. Get a post by id : DONE
// 5. Update a post
// 6. Delete a post
// 7. Get all posts by tag
// 8. Get top creators
const express = require('express');
const authentication = require('./middleware');
const postCRUD = require('../model/post');
const tagCRUD = require('../model/tag')
const postRouter = express.Router();




// middleware
postRouter.use(authentication)
// 1. Get recent post from user you follow
postRouter.get('/feed-follow', postCRUD.userFollowFeed)
// 2. Get recent post globally : Return an array
postRouter.get('/feed-global', postCRUD.lastestPostFeed)
// 3. Create a post: /post
postRouter.post('/', postCRUD.post, tagCRUD.newPost, tagCRUD.getTop10)  
// 8. Get top creators
postRouter.get('/topcreator', postCRUD.topCreator)
// 9. User like/unlike a post
postRouter.put('/like', postCRUD.userLikePost)
// 4. Get a post by id 
postRouter.get('/:id', postCRUD.getPostById)
// 5. Update a post
// 6. Delete a post
// 7. Get all posts by tag: Handle at tag router



module.exports = postRouter;