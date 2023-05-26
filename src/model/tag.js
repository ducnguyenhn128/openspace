const mongoose = require('mongoose')

const URL = 'mongodb+srv://ducnguyendautunhanha:gvAXtNESbIlZqOjb@cluster0.nkverec.mongodb.net/?retryWrites=true&w=majority'
// const URL = process.env.MONGODB_URL

// Connect to MongoDB
mongoose.connect(URL)
// Choose Database
const db = mongoose.connection.useDb('openspace');

// Define Schema
const tagSchema = {
    tag : {
        type: String,
        require: true
    }, 
    count: {
        type: Number,
        require: true,
    }
}

// Define Model
const tagModel = db.model('tags', tagSchema)

const updateTag = async (tag) => {
    try {
        const query = { tag: tag };
        const update = { $inc: { count: 1 } };
        const updateTag = await tagModel.findOneAndUpdate(query, update);
        console.log('Update tag: count plus 1')
    } catch (err) {
        console.log(err)
    }
}

const createTag = async (tag) => {
    try {
        const newTag = new tagModel({
            tag: tag,
            count: 1
        })
        await newTag.save();
        console.log('New Tag')
    } catch (err) {
        console.log(err)
    }
}

const tagCRUD = {
    // 1. Update to tag collection in DB when user posts a new post
    newPost: async function(req, res, next) {
        try {
            const {tagList} = req.body;
            await Promise.all(
                tagList.map( async(tag) => {
                    // check tag is still in the DB or not
                    const findTag = await tagModel.findOne({tag: tag})
                    // not found => create a new tag
                    if (!findTag) {
                        createTag(tag)
                    } else {
                        // find tag => just update
                        updateTag(tag)
                    }
                })
            )
            next();
        } catch (err) {
            console.log(err)
        }
        
    } , 
    // 2. Get most common tag
    getTop10: async function(req, res) {
        try {
            // console.log(`receive`)npm 
            const top10Tag = await tagModel.find().sort({count: -1})
                .limit(10)
                .lean()

            // console.log(top10Tag)
            // just send the array like: ['sport', 'news' ...]
            const topTag = top10Tag.map(el => {
                return el.tag
            })

            console.log(topTag)
            res.json(topTag)
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = tagCRUD