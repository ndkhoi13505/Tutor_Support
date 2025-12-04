const accountData = JSON.parse(localStorage.getItem("user"));

if (!accountData) window.location.href = "index.html";

const welcomeMessageRender = () => {
    document.querySelector(".user-welcome h1").innerText = accountData.fullname
    document.querySelector(".user-avatar").src = `assets/images/${accountData.role}_avt.jpg`
}

welcomeMessageRender()