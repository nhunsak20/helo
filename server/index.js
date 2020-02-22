require('dotenv').config()

const express = require('express')
const massive = require('massive')
const authCtlr = require('./authController')
const ctlr = require('./controller')

const { SERVER_PORT, CONNECTION_STRING } = process.env
const app = express()

app.use(express.json())

app.post('/api/login', authCtlr.login)
app.post('/api/register', authCtlr.register)

app.get('/api/posts/:id', ctlr.getPosts)
app.get('/api/posts', ctlr.getAllPosts)
app.post('/api/posts/:id', ctlr.newPost)

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

