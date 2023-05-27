// ============================================================================
// Post Model : /post
// 1. Get recent post from user you follow: done
// 2. Get recent post globally : done
// 3. Create a post: /post : DONE
// 4. Get a post by id : DONE
// 5. Update a post
// 6. Delete a post
// 7. Get all posts by tag
// 8. Get top creators
// 9. User like post
// 10. Get user's recent post
require('dotenv').config();

const URL = process.env.MONGODB_URL

const { findUserById, getUserAvatar } = require('./user');

const mongoose = require('mongoose');
const userModel = require('./user')
mongoose.connect(URL)
// Choose Database
const db = mongoose.connection.useDb('openspace');

// Define Schema
const postSchema = {
    // 8 fields
    // At the post: 5 fileds
    title : {
        type: String, 
        require: true,
    }, 
    body: {
        type: String, 
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    tagList : {
        type: Array,
        require: false,
    },
    createdAt : {
        type: String,
        require: true,
    },
    // After post : 3 field
    updatedAt : {
        type: String,
        require: false,
    },
    favorited: {
        type: Array,
        require: true,
    },
    favoritedCount: {
        type: Number,
        require: true
    }
}

// Define model
const postModel = db.model('posts', postSchema)

// Utility function
// getAuthor from the post id
const getAuthor = async (post) => {
    const authorID = post.author ? post.author : '';
    const author = await findUserById(authorID);
    return author.fullname
}

const postCRUD = {
    // 1. Get recent post from user you follow
    userFollowFeed: async function(req, res) {
        // 1.  query user follower array 
        const userID = req.user.userID;
        const user = await findUserById(userID);
        const userFollowing = user.follow.following;
        console.log(userFollowing)
        // 2.  Get last 10 posts from user's following

        const pageSize = 10; // Number of items per page
        const pageNumber = req.query.page || 1
        const skip = (pageNumber - 1) * pageSize; // Calculate the number of records to skip
        const limit = pageSize; // Set the limit to the number of items per page
        const posts = await postModel.find({ author: { $in: userFollowing }})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
        console.log(posts)
        // 3: Handle array: add author name from the array (to display in FE)
        // 4: Handle array: add client Like Status from the array (to display in FE)
        // 5: add author avatar
        await Promise.all(
            posts.map(async (post) => {
                const authorname = await getAuthor(post);
                post['authorname'] = authorname;
                const checkUserLikePost = post.favorited.includes(userID)
                console.log(checkUserLikePost)
                post['userLikeStatus'] = checkUserLikePost      //add client Like Status
                post['author_avatar'] = await getUserAvatar(post.author)
            })
        )
        // console.log(posts);
        // Respond data
        res.status(200).json(posts)
    },
    // 2. Get recent post globally: return an array
    lastestPostFeed: async function(req, res) {

        // 1: query user
        const userID = req.user.userID;
        // const user = await findUserById(userID);
        // 2: Get all Posts

        const pageSize = 10; // Number of items per page
        const pageNumber = req.query.page || 1

        const skip = (pageNumber - 1) * pageSize; // Calculate the number of records to skip
        const limit = pageSize; // Set the limit to the number of items per page

        const posts = await postModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
        console.log(posts)
        // 3: Handle array: add author name from the array (to display in FE)
        // 4: Handle array: add client Like Status from the array (to display in FE) - check 'clientID' in the favorite array
        // 5: add author avatar
        await Promise.all(
            posts.map(async (post) => {
                const authorname = await getAuthor(post);
                post['authorname'] = authorname   //add author name
                const checkUserLikePost = post.favorited.includes(userID)   // check like status
                console.log(checkUserLikePost)
                post['userLikeStatus'] = checkUserLikePost      //add client Like Status
                post['author_avatar'] = await getUserAvatar(post.author)
            })
        )
        console.log(posts)

        res.status(200).json(posts)
    },

    // 3. Create a post: /post
    post : async function (req, res, next) {
        console.log(`Receive a new post`)
        const {title, body, tagList, createdAt } = req.body;
        try {
            const newPost = new postModel({
                ...req.body,
                author: req.user.userID,
                updatedAt: '',
                favorited: [],
                favoritedCount: 0,
            })
            await newPost.save();
            res.status(201).json({
                message: 'Post successful'
            });
            next();
        } catch(err) {
            console.log(err);
            res.status(500).send();
        }
    } ,
    // 4. Get a post by id
    getPostById: async function (req, res) {
        try {
            const id = req.params.id;
            const foundPost = await postModel.findById(id);
            // console.log(foundPost)
            const {author, title, body, createdAt, favorited, favoritedCount, _id} = foundPost;
            const result = {_id, author, title, body, createdAt, favorited, favoritedCount}
            // Find the author by the authod id: ex: author: '6468dde45ed7ce6ab3d8279f' => userID
            const author1 = await findUserById(foundPost.author);
            result.fullname = author1.fullname
            // console.log(result)
            // Check user has liked post yet ?
            const userID = req.user.userID;
            result.userLikeStatus = foundPost.favorited.includes(userID)  // check whether or not the array contain all people liked post includes uesrID ?
            // author avatar
            result.author_avatar = await getUserAvatar(author)
            console.log(result)
            res.status(200).json(result)
        } catch(err) {
            console.log(err);
            res.status(204).send();
        }

    },
    // 5. Update a post

    // 6. Delete a post

    // 7. Get all posts by tag
    getPostByTag: async function (req, res) {
        const userID = req.user.userID; // query client
        try {
            const tag = req.params.tag;
            console.log(tag)
            const posts = await postModel
                .find({ tagList: { $in : [tag] }  })
                .sort({ createdAt: -1 })
                .limit(10)
                .lean();
            // handle array: add author name from the array (to display in FE)
            await Promise.all(
                posts.map(async (post) => {
                    const authorname = await getAuthor(post);
                    post['authorname'] = authorname
                    const checkUserLikePost = post.favorited.includes(userID)   // check like status
                    console.log(checkUserLikePost)
                    post['userLikeStatus'] = checkUserLikePost      //add client Like Status
                    post['author_avatar'] = await getUserAvatar(post.author)
                })
            )
            res.status(200).json(posts);
        } catch(err) {
            console.log(err);
            res.status(404).send();
        }
    },
    // 8. Get top creators
    topCreator : async function(req, res) {
        const data = await postModel.aggregate([
            {
                $group: {
                  _id: '$author',
                  count: { $sum: 1 } // author post
                }, 
            },
            {$limit: 10} , 
            {
                $sort: {
                  count: -1 
                }
            }
        ])
        // data: [{_id: 42314153, count: 12}, ......]
        // Handle Data to send Client
        async function getTopCreator() {
            const topCreator = await Promise.all(
                data.map( async (el) => {
                    const id = el._id;
                    const user = await findUserById(id);
                    // console.log(user)
                    let fullname = user.fullname
                    let avatar = user.avatar
                    // return avatar
                    return ({id: id, fullname: fullname, avatar})
            }))
            // console.log(topCreator)
            return topCreator
        }

        getTopCreator()
            .then(result => res.status(200).send(result))

    } , 
    // 9. User like/unlike a post
    userLikePost : async function(req, res) {
        // console.log(`Server receive a post like request`);
        const {userID, postID} = req.body;
        // foundpost
        try {
            const foundPost = await postModel.findById(postID);
            if (!foundPost) {
                res.status(404).send();
            }
            // check user has liked post already ????
            // console.log(userID)
            // const checkUserLikePost = await postModel.findOne({favorited: { $in : userID}})
            const checkUserLikePost = foundPost.favorited.includes(userID)
            // has not liked yet
            if (!checkUserLikePost) {
                await postModel.findByIdAndUpdate(
                    postID,
                    {                    
                        $inc : {favoritedCount : 1},
                        $push: {favorited: userID}
                    },
                    {new: true}

                )
            }
            // has liked
            if (checkUserLikePost) {
                await postModel.findByIdAndUpdate(
                    postID,
                    {
                        $inc : {favoritedCount : -1},
                        $pull: {favorited: userID}
                    }
                )
                
            }
            res.status(200).send()
        } catch(err) {
            console.log(err)
        }
    }, 
    // 10. Get user's recent post
    userRecentPost: async function(req, res) {
        const userID = req.user.userID
        try {
            const author = req.query.author
            const recentPost = await postModel.find({author: author}).lean()
            // handle array: add author name from the array (to display in FE)
            await Promise.all(
                recentPost.map(async (post) => {
                    const authorname = await getAuthor(post);
                    post['authorname'] = authorname
                    const checkUserLikePost = post.favorited.includes(userID)   // check like status
                    console.log(checkUserLikePost)
                    post['userLikeStatus'] = checkUserLikePost      //add client Like Status
                    post['author_avatar'] = await getUserAvatar(post.author)
                })
            )
            console.log(recentPost)
            res.status(200).send(recentPost)
        } catch(err) {
            console.log(err)
        }
    }

}

module.exports = postCRUD;