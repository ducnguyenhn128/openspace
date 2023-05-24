const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const secretkey = 'ab240f90aba431402985eddc45f4d413a33ebc925575c558168a98b2c38033a6';
const jwt = require('jsonwebtoken')
const userProtype = require('./sample');
require('dotenv').config();

// Connect to MongoDB
const URL = 'mongodb+srv://ducnguyendautunhanha:gvAXtNESbIlZqOjb@cluster0.nkverec.mongodb.net/?retryWrites=true&w=majority'
// const URL = process.env.MONGODB_URL

mongoose.connect(URL)
// Choose Database
const db = mongoose.connection.useDb('openspace');


// Define Schema
const userSchema = {
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }, 
    fullname : {
        type: String,
        require: true
    },
    info : {type: Object},
    stats: {type: Object},
    avatar: {type: Object},
    follow: {type: Object},
    privacy: {type: Object},
}

// Define Model
const userModel = db.model('users', userSchema)

const userCRUD = {
    // 1. Get All Users
    get: async function(req, res) {
        const foundUser = await userModel.find()
        res.json(foundUser)
    } ,
    // 2. Get user by ID
    getById: async function(req, res) {
        try {
            const foundUser = await userModel.findById(req.params.id);
            res.status(200).json(foundUser)
        } catch (err) {
            res.status(404).send('User not found')
        }
    },
    // 3. Create new User
    post: async function(req, res) {
        // const newUser = req.body;
        console.log('received a new user' + req.body)
        const {username, email, password, fullname} = req.body;
        console.log(fullname)
        // checking username, email still in the DB ???
        try {
            const foundUser = await userModel.findOne({username: username})
            const foundEmail = await userModel.findOne({email: email})
            if (foundUser) {
                res.status(500).send('Username has taken')
            }
            if (foundEmail) {
                res.status(500).send('Email has taken')
            }
            // hash password by 10 rounds
            const hashPassword = await bcrypt.hash(password, 10);
            // create new User
            const newUser = new userModel({
                password: hashPassword, 
                fullname,
                username, 
                email, 
                ...userProtype
            });

            await newUser.save();
            res.status(201).json({
                message: 'Create new user success'
            })
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    },
    // 4. Change user infomation
    put: async function(req, res) {
        const id = req.params.id;
        try {
            await userModel.findByIdAndUpdate(id, req.body)
            res.status(200).send('Update success');
        } catch (err) {
            console.log(err);
            res.status(500).send()
        }
    },
    // 5. Delete user
    delete: async function(req,res) {
        const id = req.params.id;
        try {
            await userModel.findByIdAndDelete(id)
            res.status(204).send()
        } catch (err) {
            console.log(err);
            res.status(500).send()
        }
    },
    // 6. Login
    login : async function(req, res) {
        
        if (!req.body.username || !req.body.password) {
            res.send('Please fill both username and password')
        }
        const {username, password} = req.body;
        // Find user in DB
        let user = await userModel.findOne({username: username});
        // 1. user not found
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        // 2. foundUser, compare password
        const matchedPassword = bcrypt.compare(password, user.password);
        if (matchedPassword) {
            // jwt token
            const payload = {
                userID: user.id,
                username: user.username,
            }
            
            const token = jwt.sign(payload, secretkey, {expiresIn: '100d'})
            // Set the token as a cookie in the response
            // localStorage.setItem('jwtToken', token);
            const expiresDate = new Date();
            expiresDate.setDate(expiresDate.getDate() + 100);

            res.cookie('jwtToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: expiresDate,
            });
            res.status(200).json({token})
        } else {
            res.status(401).send('Wrong password')
        }
        
    },
}

async function userProfile(req, res) {
    const id = req.user.userID;
    try {
        const foundUser = await userModel.findById(id);
        res.status(200).json(foundUser)
    } catch (err) {
        res.status(404).send('User not found')
    }
}

async function findUserById(id) {
    try {
        const foundUser = await userModel.findById(id);
        return foundUser
    } catch(err) {
        console.log(err)
    }
}
// Export object
module.exports = {userCRUD, userProfile, findUserById }