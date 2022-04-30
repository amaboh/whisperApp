const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') 
const session = require('express-session');
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

// Load config files from config files
dotenv.config({path: './config/config.env'})

// Passport config
const routes = require('./config/passport')(passport)

connectDB()

const app = express();

// Body parser
app.use(express.urlencoded({extended: false})) //get data from form 
app.use(express.json())

// method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))


// handlebars helpers
const {
        formatDate, 
        stripTags, 
        truncate, 
        editIcon,
        select
    } = require('./helpers/hbs')


// Loggingg with morgan to see the commands made to the server in the terminal
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars
app.engine(
    '.hbs', 
    exphbs.engine({ helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,  
        },
        defaultLayout: 'main', 
        extname: '.hbs'}));
app.set('view engine', '.hbs');
     
// sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
    })

)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set gloabal var to access var from anywhere with the templates
app.use(function(req, res, next) {
    res.locals.user = req.user || null
    next()
})


// Static folder for styles/images
app.use(express.static(path.join(__dirname, 'public'))) 


// routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))   
app.use('/stories', require('./routes/stories'))  


const PORT = process.env.PORT || 3000

app.listen(PORT,
     console.log(`server running in ${process.env.NODE_ENV} MODE ON PORT ${PORT} `));