const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');


const User = require('../Models/User');

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {

        // check if username is already taken
        User.findOne({ username }).then(user => {
            if (user) {
                res.status(400).json('Error: Username already taken');
            } else {
                // hash password
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        res.status(400).json('Error: ' + err);
                    } else {
                        const newUser = new User({
                            username,
                            password: hash
                        });
                        newUser.save()
                            .then(() => res.json('User added!'))
                            .catch(err => res.status(400).json('Error: ' + err));
                    }
                });
            }
        });
    }
    else {
        res.status(400).json('Error: Please fill all fields');
    }
});


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        User.findOne({ username}).then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.status(400).json('Error: ' + err);
                    } else {
                        const payload = {
                            username: user.username
                        };
                        const token = jwt.sign(payload, req.app.get('jwt_secret_key'), {
                            expiresIn: 720 // 12 hours
                        });
                        res.json({
                            status: true,
                            token
                        });
                    }
                });
            } else {
                res.status(400).json('Error: User not found');
            }
        });
    } else {
        res.status(400).json('Error: Please fill all fields');
    }
});

module.exports = router;