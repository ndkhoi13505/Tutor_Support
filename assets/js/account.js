function checkLogin() {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var errorMsg = document.getElementById("error-message");

    if (user === "khoi.nguyen13505" && pass === "123456") {
        window.location.href = "student_home.html"; 
    } else {
        errorMsg.style.display = "flex";
    }
}

function deleteContent() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("error-message").style.display = "none";
    document.getElementById("username").focus();
}