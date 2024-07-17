//var currentPost = sessionStorage.getItem(postId)
var currentPostID = sessionStorage.getItem(postId)
var currentPost = sessionStorage.getItem("66984bd446930466bd080228")
let currentPostURLStart = "http://192.168.28.129:3000/api/posts/"
let currentPostIDString = toString(currentPostID)
let currentPostURL = currentPostURLStart.concat(currentPostIDString);

window.onload = function() {
    /***Used for testing the payload contents***/
    //fetch('http://192.168.28.129:3000/api/posts/${currentPost}', { // Change to actual variable
    fetch(currentPostURL, { // Change to actual variable
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => console.log(data.id))
    /*
    .then(data => {
        if (data.success) {
            alert('Sign up successful, please signin');
            window.location.href = "signin.html";
        } else {
            alert('Sign up failed: ' + data.message);
        }
    })
    */
    .catch(error => {
        console.error('Error:', error);
        alert('Post Fetch Failed');
    });
}