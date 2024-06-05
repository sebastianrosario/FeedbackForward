let signupbutton = document.getElementById("signupbutton");
let signinbutton = document.getElementById("signinbutton");

signinbutton.onclick = function() {
    window.location.href = "signin.html";
}

signupbutton.onclick = function() {
    // Get form data
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Hash the password using CryptoJS
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Create a payload
    const payload = {
        username: username,
        email: email,
        password: hashedPassword
    };

    /***Used for testing the payload contents***/
    localStorage.setItem('signupPayload', JSON.stringify(payload));
    window.location.href = "display.html";
    /***/
}
