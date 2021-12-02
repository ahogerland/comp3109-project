require('dotenv').config()
const config = require('./config/config')

const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const db = require('./models')
const cors = require('cors')

// API ACCESS MODIFIERS
const app = express()

// Connect to database
db.sequelize.sync({
        force: false
    })
    .then(() => {
        console.log("Database synced")
    })
    .catch(err => {
        console.log("Error: Database not synced")
        console.log(err)
        throw new Error("Error: Database not synced")
    })

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser(process.env.SESSION_SECRET))

// Websites that are accepting API requests
// const allowOrigins = ['http://localhost:3000', 'http://localhost:3002']

app.use(cors( {
    origin: true,
    credentials: false
}))


// Used to assign permissions to users, which can then be used to route them to the appropriate pages
app.use(require('./middleware/user_identification'))

// Application Gateways
app.use('/student', require('./API_Gateways/Student_Gateway')) // handle creating and editing staff

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(create(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.status(500)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, async () => {
    console.log(`Server has started, listening on PORT: ${PORT}`)
})
