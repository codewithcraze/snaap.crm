const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
// creating instance of express.
const cors = require('cors');
app.use(cookieParser()); // for allowing cookie.

app.use(express.urlencoded({ extended: true }));
// Cross Origin Resource Sharing.
app.use(cors());

const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport'); // Getting the jwtStrategy
const { handleError }  = require('./middleware/apierror');


app.get('/', (req, res) => {
    res.send('API is working Correctly');
})


app.use(passport.initialize());
passport.use('jwt', jwtStrategy); 
require('dotenv').config(); 

const routes = require('./routes');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;

// parsing.
app.use(bodyParser.json());

app.use('/api', routes);
// Error handling.

const connectWithRetry = async () => {
        try {
            const connection = await mongoose.connect(`${process.env.DB_HOST}`);
            if (connection) {
                console.log('Connected to DB successfully');
                return; // Exit the function if connected
            }
        } catch (error) {
            console.error('Failed to connect to the DB after maximum retries.');
        }
};

(async () => {
    await connectWithRetry();
})();



app.use((err, req, res, next) => {
    handleError(err, res);
})

// Server Listening.
app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})
