window.onload = () => {
    const url = new URL(window.location.href)
    const err = url.searchParams.get("err")
    const err_desc = document.getElementById("error-text")

    switch (err) {
        case "fish":
            err_desc.innerText = "Internal server error"
            break;
        case "turkey":
            err_desc.innerText = "Incorrect password"
            break;
        case "mongoose":
            err_desc.innerText = "Registration failed"
            break;
        case "mongoose":
            err_desc.innerText = "Registration successful"
            break;
    }
}