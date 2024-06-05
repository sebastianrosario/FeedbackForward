let signupbutton = document.getElementById("signupbutton");
let signinbutton = document.getElementById("signinbutton");

signupbutton.onclick = function() {
    window.location.href = "signup.html";
}

signinbutton.onclick = function() {
    // Get form data
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Hash the password using CryptoJS
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Create a payload
    const payload = {
        username: username,
        password: hashedPassword
    };

    /***Used for testing the payload contents***/
    localStorage.setItem('signupPayload', JSON.stringify(payload));
    window.location.href = "display.html";

    /***/
}