const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')

// Load config files from config files

dotenv.config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express();

// Loggingg with morgan to see the commands made to the server in the terminal

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
)

 


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Static folder for styles/images
app.use(express.static(path.join(__dirname, 'public'))) 



// routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 3000

app.listen(PORT,
     console.log(`server running in ${process.env.NODE_ENV} MODE ON PORT ${PORT} `));