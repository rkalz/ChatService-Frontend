const request = require('request')

module.exports = {
    handleAuthRequest: (req, res, endpoint) => {
        const signInParams = {
            user: req.params.username,
            pass: req.params.password
        }

        request({
            url: "http://auth:8080/api/v1/private/" + endpoint,
            headers: {
                "content-type": "application/json"
            },
            json: signInParams
        }, (err, resp, body) => {
            if (err || !err && resp.statusCode == 400) {
                res.redirect('/?err=fish')
            } else {
                const response = JSON.parse(body)
                if (response["code"] == 100) {
                    res.cookie("username", user)
                    res.cookie("session", response["session"])
                    res.redirect('/chats')
                } else {
                    res.redirect('/?err=turkey')
                }
            }
        })
    }
}