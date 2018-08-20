const express = require('express')
const request = require('request')
let app = express()

app.use('/js', express.static('js'))
app.use('/css', express.static('css'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/login.html')
})

app.get('/chats', (req, res) => {
    res.sendFile(__dirname + '/static/history.html')
})

app.post('/signin/', (req, res) => {
    const signInParams = {
        user: req.param("username"),
        pass: req.param("password")
    }

    request({
        url: "http://host.docker.internal:8080/api/v1/private/signin",
        headers: {
            "content-type": "application/json"
        },
        json: signInParams
    }, (err, resp, body) => {
        if (err || !err && resp.statusCode == 400) {
            res.sendStatus(400)
        }
        const response = JSON.parse(body)
        if (response["code"] == 100) {
            res.cookie("username", user)
            res.cookie("session", response["session"])
            res.redirect('/chats')
        } else {
            res.sendStatus(403)
        }
    })

})

app.post('/signup/', (req, res) => {

})

app.listen(8082, () => {
    console.log("Listening on port 8082")
})