require('dotenv').config();
require('express-async-errors');
//express
const express = require("express");
const app = express();

//rest of the packages
const morgan = require('morgan');


//databse connection
const connnectDB = require('./db/connect');

// routers
const authRouter = require('./routes/authRoutes');

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler'); 

app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('e-commerce api');
});
app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        //first we will connect to the DB
        await connnectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server is listening on port: ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();