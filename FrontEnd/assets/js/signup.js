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

    const payload = JSON.stringify({
        username: username,
        email: email,
        password: hashedPassword
    });

    /***Used for testing the payload contents***/
    fetch('http://192.168.28.129:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Sign up successful, please signin');
            window.location.href = "signin.html";
        } else {
            alert('Sign up failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sign up failed');
    });
}
