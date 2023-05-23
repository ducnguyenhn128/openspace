const jwt = require("jsonwebtoken");
const secretkey = 'ab240f90aba431402985eddc45f4d413a33ebc925575c558168a98b2c38033a6';

//The authentication middleware will do
// 1. Identify client by there token (save in cookie)
// 2. Check token

const authentication = (req, res, next) => {
    // return 
    // 1. req.user (id)
    // 2. req.user_fullname
    try {
        // do not delete
        console.log(`cookie: ${req.headers.cookie}`)
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
module.exports = authentication