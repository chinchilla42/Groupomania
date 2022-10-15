/* Import json web token*/ 
const jwt = require('jsonwebtoken');

/* Export authentication middleware */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.userId;
        const admin = decodedToken.admin;
        req.auth = {
            userId, admin
        };
     next();
    } catch(error) {
        res.status(401).json({ error });
    }
 };