const auth = require('./auth')
const express = require('express')
const bodyParser = require('body-parser')
let app = express()

app.use('/js', express.static('js'))
app.use('/css', express.static('css'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (_, res) => {
    res.sendFile(__dirname + '/static/login.html')
})

// TODO: Make sure we have correct data?
app.get('/chats', (_, res) => {
    res.sendFile(__dirname + '/static/history.html')
})

app.post('/signin', (req, res) => {
    // Make sure the account is valid
    auth_outcome = auth.handleAuthRequest(req, "signin")
    if (auth_outcome == auth.responseCodes.accountLoginFailed) {
        res.redirect('/?err=fish')
        return
    }

    // Generate a session id
    res.redirect('/')
})

app.post('/signup', (req, res) => {
    // Create an account
    auth_outcome = auth.handleAuthRequest(req, "signup");
    if (auth_outcome == auth.responseCodes.accountCreationSuccess) {
        res.redirect('/?err=viper')
        return
    }
    res.redirect('/?err=mongoose')
})

app.listen(80, () => {
    console.log("Listening on port 80")
})