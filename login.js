let user;
let pass;
let result;

function signin() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            const response = JSON.parse(request.responseText)
            if (response["code"] == 100) {
                document.cookie = "username=" + user.value + ";path=/";
                document.cookie = "session=" + response["session"] + ";path=/";
                window.location.href = "history.html";
            } else {
                result.textContent = "Invalid username or password!";
            }
        } else if (request.readyState == 4 && request.status == 400) {
            result.textContent = "Internal server error"
        }
    }

    const body = {
        user: user.value,
        pass: pass.value
    };
    // Will obviously move to HTTPS with public API
    request.open("POST", "http://localhost:8080/api/v1/private/signin", true);
    request.send(JSON.stringify(body));
}

function signup() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            const response = JSON.parse(request.responseText)
            if (response["code"] == 200) {
                result.textContent = "Account created!"
            } else {
                result.textContent = "Account creation failed!";
            }
        } else if (request.readyState == 4 && request.status == 400) {
            result.textContent = "Internal server error"
        }
    }

    const body = {
        user: user.value,
        pass: pass.value
    };
    request.open("POST", "http://localhost:8080/api/v1/private/signup", true);
    request.send(JSON.stringify(body));
}

window.onload = () => {
    result = document.getElementById("result")
    user = document.getElementById("username")
    pass = document.getElementById("password")
    document.getElementById("submit").onmousedown = signin;
    document.getElementById("register").onmousedown = signup;

    document.addEventListener("keypress", e => {
        const ENTER_KEY = 13;
        const pressed_key = e.which || e.keyCode;
        if (pressed_key == ENTER_KEY) {
            signin();
        }
    })
}