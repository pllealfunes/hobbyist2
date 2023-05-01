require('dotenv').config()
const path = require("path")
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express()

const blogAPI = require('./api/blogApi')
const auth = require('./api/auth')
const users = require('./api/users')


/* Connect to Database */
mongoose.connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))


app.use(cookieParser())


/* POST form handling */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/* Routing */

app.use('/api/blog', blogAPI)
app.use('/api/auth', auth)
app.use('/api/users', users)

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(express.static(path.join(__dirname, '/../client', 'build')))

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../client', 'build', 'index.html'))
});


app.listen(process.env.PORT, () => console.log("Server started!"))

module.exports = app;