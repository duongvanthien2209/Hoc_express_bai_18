require('dotenv').config(); // Đọc các secret key từ file .env - process.env

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Set viw engine
app.set('view engine', 'pug');
app.set('views', './views');

// Set static file
app.use(express.static('public'));

// Đọc cookies
app.use(cookieParser(process.env.SECRET_COOKIES));

// Đọc dữ liệu từ form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');

// Middlewares
const authMiddleware = require('./middlewares/auth.middleware');

// Validations
const userValidate = require('./validations/user.validate');

app.use('/auth', authRoute);

app.use(authMiddleware.checkLogin);
 
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.use(userValidate.checkUser);

app.use('/users', userRoute);
 
app.listen(3000);