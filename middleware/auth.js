const jwt = require('jsonwebtoken');
const config = require('../config');

// module.exports = function (req, res, next) {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).send('Access denied.');

//     try {
//         const verified = jwt.verify(token.split(' ')[1], config.secret);  // Split and verify Bearer token
//         // const verified = jwt.verify(token, config.secret);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).send('Invalid token.');
//     }
// };

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied.');

    try {
        const decodedToken = jwt.verify(token.split(' ')[1], config.secret);
        req.user = decodedToken;

        if (req.user.role !== 'admin') {
            return res.status(403).send('Access denied. You do not have the required role.');
        }

        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};
