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

const connectWithRetry = async (maxRetries = 5, delay = 500) => {
    let retries = 0;

    while (retries < maxRetries) {
        try {
            console.log(`Attempting to connect to the DB (Attempt ${retries + 1} of ${maxRetries})...`);
            const connection = await mongoose.connect(`${process.env.DB_HOST}`);
            if (connection) {
                console.log('Connected to DB successfully');
                return; // Exit the function if connected
            }
        } catch (error) {
            retries++;
            console.error(`Failed to connect to the DB. Retrying in ${delay / 1000} seconds...`, error.message);
            if (retries >= maxRetries) {
                console.error('Failed to connect to the DB after maximum retries.');
                throw new Error('Database connection failed after multiple retries');
            }
            await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
        }
    }
};

(async () => {
    try {
        await connectWithRetry(); // Adjust maxRetries and delay if needed
    } catch (error) {
        console.error('Exiting the application due to DB connection failure:', error.message);
        process.exit(1); // Exit the process with failure code
    }
})();


app.use((err, req, res, next) => {
    handleError(err, res);
})

// Server Listening.
app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})
