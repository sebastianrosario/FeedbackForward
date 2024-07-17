var currentPost = sessionStorage.getItem(postId)

window.onload = function() {
    /***Used for testing the payload contents***/
    fetch('http://192.168.28.129:3000/api/posts/currentPost', { // Change to actual variable
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
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