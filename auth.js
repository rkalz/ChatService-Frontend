const request = require('request')
const os = require('os')

module.exports = {
    responseCodes: {
        "internalError": 1,
        "accountLoginFailed": 2,
        "accountLoginSuccess": 3,
        "accountCreationFailed": 4,
        "accountCreationSuccess": 5,
    },
    handleAuthRequest: (req, endpoint) => {
        const signInParams = {
            user: req.body.username,
            pass: req.body.password
        }

        request({
            url: "http://ilb/auth/" + endpoint,
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "User-Agent": "Chatservice Frontend: " + os.hostname()
            },
            json: signInParams
        }, (err, resp, body) => {
            console.log(resp.statusCode)
            if (err || !err && resp.statusCode == 400) {
                switch (endpoint) {
                    case "signin":
                        return module.exports.responseCodes.accountLoginFailed
                    case "signup":
                        return module.exports.responseCodes.accountCreationFailed
                }
            } else {
                let response;
                try {
                    response = JSON.parse(body)
                } catch(err) {
                    console.log(body)
                    return module.exports.responseCodes.internalError
                }
                if (endpoint == "signin" && response["code"] == 100) {
                    return module.exports.responseCodes.accountLoginSuccess
                } else if (endpoint == "signup" && response["code"] == 200) {
                    return module.exports.responseCodes.accountCreationSuccess
                } else {
                    switch (endpoint) {
                        case "signin":
                            return module.exports.responseCodes.accountLoginFailed
                        case "signup":
                            return module.exports.responseCodes.accountCreationFailed
                    }
                }
            }
        })
    }
}