const handle = require('./handle')
const express = require('express')
let app = express()

app.use('/js', express.static('js'))
app.use('/css', express.static('css'))

app.get('/', (_, res) => {
    res.sendFile(__dirname + '/static/login.html')
})

app.get('/chats', (_, res) => {
    res.sendFile(__dirname + '/static/history.html')
})

app.post('/signin', (req, res) => handle.handleAuthRequest(req, res, "signin"));
app.post('/signup', (req, res) => handle.handleAuthRequest(req, res, "signup"));

app.listen(8080, () => {
    console.log("Listening on port 8080")
})