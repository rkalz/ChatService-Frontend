let username;
let session;

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
}