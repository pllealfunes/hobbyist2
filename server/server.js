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
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DBURI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


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

//Connect to the database before listening
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("listening for requests");
    })
})


module.exports = app;