const request = require('request')

module.exports = {
    responseCodes: {
        "internalError": 0,
        "accountLoginFailed": 1,
        "accountLoginSuccess": 2,
        "accountCreationFailed": 3,
        "accountCreationSuccess": 4,
    },
    handleAuthRequest: (req, endpoint) => {
        const signInParams = {
            user: req.params.username,
            pass: req.params.password
        }

        request({
            url: "http://ilb/auth/" + endpoint,
            headers: {
                "content-type": "application/json"
            },
            json: signInParams
        }, (err, resp, body) => {
            if (err || !err && resp.statusCode == 400) {
                return responseCodes.accountLoginFailed
            } else {
                const response = JSON.parse(body)
                if (response["code"] == 100) {
                    switch (endpoint) {
                        case "signin":
                            return responseCodes.accountLoginSuccess
                        case "signup":
                            return responseCodes.accountCreationSuccess
                    }
                } else {
                    switch (endpoint) {
                        case "signin":
                            return responseCodes.accountLoginFailed
                        case "signup":
                            return responseCodes.accountCreationFailed
                    }
                }
            }
        })
    }
}