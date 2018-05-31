let username;
let session;
let socket;

function logout() {
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    // Some kind of API call to delete session ID
    let delSess = new XMLHttpRequest()
    delSess.onreadystatechange = () => {
        if (delSess.readyState == 4) {
            username = undefined;
            session = undefined;
            socket.disconnect();
            socket = undefined;
            window.location.href = "login.html";
        }
    }
    delSess.open("POST", "http://localhost:8081/api/v1/private/sessions/del/" + session)
    delSess.send()
}

window.onload = () => {
    const cookie = document.cookie.split(';');
    for (let i = 0; i < cookie.length; ++i) {
        let c = cookie[i].split('=')
        if (c.indexOf("username") == 0) {
            username = c[1];
        } else if (c.indexOf(" session") == 0) {
            session = c[1];
        }
    }
    document.getElementById("username").textContent = username;
    document.getElementById("session").textContent = session;

    socket = io('http://localhost:8082');
    socket.emit('session', { sess: session })
    socket.on('my-ping', data => {
        console.log("ping received")
        socket.emit('my-pong')
    })
    document.getElementById("logout").onmousedown = logout
}