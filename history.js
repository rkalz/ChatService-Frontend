let username;
let session;

function logout() {
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    params = {
        origin: navigator.userAgent,
        username: username,
        session: session,
    }

    let delSess = new XMLHttpRequest()
    delSess.onreadystatechange = () => {
        if (delSess.readyState == 4) {
            username = undefined;
            session = undefined;
            window.location.href = "login.html";
        }
    }
    delSess.open("POST", "http://localhost:8080/api/v1/private/signout")
    delSess.send(JSON.stringify(params))
}

window.onload = () => {
    const cookie = document.cookie.split(';');
    for (let i = 0; i < cookie.length; ++i) {
        let c = cookie[i].split('=')
        if (c.indexOf("username") == 0) {
            username = c[1];
        } else if (c.indexOf(" session") == 0) {
            session = c[1];
            console.log("Session ID: " + session)
        }
    }
    document.getElementById("username").textContent = username;
    document.getElementById("logout").onmousedown = logout
}