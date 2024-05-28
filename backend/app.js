const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.unsubscribe(express.json());

//Security Middleware
if (!isProduction) {
    app.use(cors());
}

//helmet helps set a variety of headers to better seure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: 'cross-origin'
    })
);

//Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);
