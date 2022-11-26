const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if (token) {
        jwt.verify(token, req.app.get('jwt_secret_key'), (err, decoded) => {
            if (err) {
                res.json({
                    status: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.decode = decoded;
                next();
            }
        });
    } else {
        res.json({
            status: false,
            message: 'No token provided.'
        });
    }
}

module.exports = auth;