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
    const payload = JSON.stringify({
        username: username,
        password: hashedPassword
    });

    fetch('http://192.168.28.129:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Sign in successful');
            console.log("success");
            if (data.token) {
                sessionStorage.setItem('key', data.token);
                console.log('Key generated and stored:', data.token);
                alert('key = ' + data.token);
            }
            window.location.href = "key.html";
        } else {
            alert('Sign in failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sign in failed');
    });
}
