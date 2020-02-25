require('dotenv').config()

const express = require('express')
const massive = require('massive')
const session = require('express-session')
const middleware = require('./middlewares/middleware')
const authCtlr = require('./authController')
const ctlr = require('./controller')

const { SERVER_PORT, CONNECTION_STRING, SECRET_SESSION } = process.env
const app = express()

app.use(express.json())

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        secret: SECRET_SESSION
    })
)

app.post('/api/auth/login', authCtlr.login)
app.post('/api/auth/register', authCtlr.register)
app.post('/api/auth/logout', authCtlr.logout)
app.get('/api/auth/me', authCtlr.getUser)

app.get('/api/posts/user/:id', middleware.userOnly, ctlr.getPosts)
app.get('/api/posts/:id', middleware.userOnly, ctlr.getPost)
app.get('/api/posts', middleware.userOnly, ctlr.getAllPosts)
app.post('/api/posts/:id', middleware.userOnly, ctlr.newPost)
app.delete('/api/posts/:id', middleware.userOnly, ctlr.deletePost)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbObj => {
    app.set('db', dbObj)
    app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))
    console.log('Database connected')
})

