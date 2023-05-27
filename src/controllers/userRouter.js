const express = require('express');
const {userCRUD, userProfile } = require('../model/user')
const userRouter = express.Router();
const morgan = require('morgan')
morgan('short');
const authentication = require('./middleware')
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

userRouter.use(cookieParser())


// Multer Set Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
  cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }  
})
const upload = multer({storage: storage})


// Regiter an user
userRouter.post('/register', userCRUD.post)

// User Login
userRouter.post('/login', userCRUD.login)
// User Logout
userRouter.post('/logout', (req, res) => {

    res.clearCookie('jwtToken', {
        httpOnly: true,
        secure: true
      });
    res.status(200).send('Logout done');
})

// testing api check login
userRouter.get('/check-login', authentication, (req, res) => {
    if (req.user) {
        // User is logged in
        res.status(200).json({ isLoggedIn: true });
      } else {
        // User is not logged in
        res.status(200).json({ isLoggedIn: false });
      }
})

userRouter.get('/profile', authentication, userProfile)

// After Login
userRouter.use(authentication)
userRouter.get('/all', userCRUD.get)
userRouter.get('/:id', userCRUD.getById)
userRouter.post('/change-avatar', upload.single('avatar'), userCRUD.avatar)  // change avatar
userRouter.put('/:id', userCRUD.put)  // update info
userRouter.delete('/:id', userCRUD.delete)



module.exports = userRouter