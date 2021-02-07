if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const cookieSession = require('cookie-session')
const session = require('express-session')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))
app.use(passport.initialize());
app.use(passport.session());

// app.use(cookieSession({
//     name: 'mibrary-session',
//     keys: ['key1' , 'key2']

// }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true ,
    useNewUrlParser : true
})

const db = mongoose.connection
db.on('error',  error => console.error(error ))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/' , indexRouter)
app.use('/authors' , authorRouter)
app.use('/books', bookRouter )

app.locals.logedIn

app.listen(process.env.PORT || 3000 )