const express = require('express');
const app = express();
const config = require('./config');

app.use(express.json());

app.set('jwt_secret_key', config.jwtSecret);

require('./connection');

const auth = require('./Middlewares/Auth');

const wordsRouter = require('./Routers/words');
const usersRouter = require('./Routers/users');

app.use('/words', auth, wordsRouter);
app.use('/users', usersRouter);


const port = config.PORT;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

