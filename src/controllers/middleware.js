const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require('path');
const secretkey = 'ab240f90aba431402985eddc45f4d413a33ebc925575c558168a98b2c38033a6';

//The authentication middleware will do
// 1. Identify client by there token (save in cookie)
// 2. Check token

const authentication = (req, res, next) => {
    try {
        // do not delete
        // console.log(`cookie: ${req.headers.cookie}`)
        if (!req.headers.cookie) {
            // Cookie not found
            return res.redirect('/login')
        }
        const token = req.headers.cookie.slice(9);
        const decoded = jwt.verify(token, secretkey);
        req.user = decoded;
        next();
    } catch(err) {
        console.log(err);
        res.status(200).send('Invalid Token');
    }
}

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
  

module.exports = {authentication, upload}