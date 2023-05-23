// ============================================================================
// Post Model : /post
// 1. Get recent post from user you follow: done
// 2. Get recent post globally : done
// 3. Create a post: /post : DONE
// 4. Get a post by id : DONE
// 5. Update a post
// 6. Delete a post
// 7. Get all posts by tag

require('dotenv').config();
// const URL = 'mongodb+srv://ducnguyendautunhanha:gvAXtNESbIlZqOjb@cluster0.nkverec.mongodb.net/?retryWrites=true&w=majority'
const URL = process.env.MONGODB_URL

const mongoose = require('mongoose');
const { findUserById } = require('./user');
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
// getAuthor from the id
const getAuthor = async (post) => {
    const authorID = post.author ? post.author : '';
    const author = await findUserById(authorID);
    if (author.info && author.info.fullname) {
        return author.info.fullname
    } else {
        return ''
    }
    // return authorName;
}


const postCRUD = {
    // 1. Get recent post from user you follow
    userFollowFeed: async function(req, res) {
        // query user follower array 
        const userID = req.user.userID;
        const user = await findUserById(userID);
        const userFollowing = user.follow.following;
        console.log(userFollowing)
        // Get last 10 posts from user's following
        const posts = await postModel.find({ author: { $in: userFollowing }})
        .sort({ createdAt: -1 })
        .limit(10)
        .lean()
        // handle array: add author name from the array (to display in FE)
        await Promise.all(
            posts.map(async (post) => {
                const authorname = await getAuthor(post);
                post['authorname'] = authorname
            })
        )
        console.log(posts)
        
        // let fullname = req.user_fullname
        // Respond data
        res.status(200).json(posts)
    },
    // 2. Get recent post globally: return an array
    lastestPostFeed: async function(req, res) {
        // query user
        const userID = req.user.userID;
        const user = await findUserById(userID);
        const posts = await postModel.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .lean()
        // handle array 
        await Promise.all(
            posts.map(async (post) => {
                const authorname = await getAuthor(post);
                post['authorname'] = authorname
            })
        )
        console.log(posts)
        
        // let fullname = req.user_fullname
        res.status(200).json(posts)
    },

    // 3. Create a post: /post
    post : async function (req, res) {
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
            })
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
            // Find the author by the authod id: ex: author: '6468dde45ed7ce6ab3d8279f' => userID
            const author = await findUserById(foundPost.author);
            const authorName = author.info.fullname;

            res.status(200).json({
                post:foundPost,
                author: authorName,
            })
        } catch(err) {
            console.log(err);
            res.status(204).send();
        }

    },
    // 5. Update a post

    // 6. Delete a post

    // 7. Get all posts by tag
    getPostByTag: async function (req, res) {
        try {
            const tag = req.params.tag;
            console.log(tag)
            const posts = await postModel
                .find({ tagList: { $in : [tag] }  })
                .sort({ createdAt: -1 })
                .limit(10)
                .lean();

                res.status(200).json(posts);
        } catch(err) {
            console.log(err);
            res.status(404).send();
        }
    }
}




module.exports = postCRUD;