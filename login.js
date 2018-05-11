let user;
let pass;
let result;

function signin() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            const response = JSON.parse(request.responseText)
            if (response["code"] == 100) {
                result.textContent = "Session ID: " + response["session"];
                document.cookie = "username=" + user + ";path=/";
            } else {
                result.textContent = "Invalid username or password!";
            }
        } else if (request.readyState == 4 && request.status == 400) {
            result.textContent = "Internal server error"
        }
    }

    const body = {user:user.value, pass:pass.value};
    request.open("POST", "https://localhost:8443/api/v1/signin", true);
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

    const body = {user:user.value, pass:pass.value};
    request.open("POST", "https://localhost:8443/api/v1/signup", true);
    request.send(JSON.stringify(body));
}

window.onload = () => {
    result = document.getElementById("result")
    user = document.getElementById("username")
    pass = document.getElementById("password")
    document.getElementById("submit").onmousedown = signin;
    document.getElementById("register").onmousedown = signup;
}