//var currentPost = sessionStorage.getItem(postId)
//var currentPostID = sessionStorage.getItem(postId)
/*
var currentPost = sessionStorage.getItem("66984bd446930466bd080228")
let currentPostURLStart = "http://192.168.28.129:3000/api/posts/"
let currentPostIDString = toString(currentPostID)
let currentPostURL = currentPostURLStart.concat(currentPostIDString);
*/

window.onload = function() {
    /***Used for testing the payload contents***/
    //fetch('http://192.168.28.129:3000/api/posts/${currentPost}', { // Change to actual variable
    fetch('http://192.168.28.129:3000/api/posts/66984cb346930466bd080277', {
    //fetch(currentPostURL, { // Change to actual variable
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('key') //'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTkxMzU5NDY5MzA0NjZiZDA4MDJkMSIsInVzZXJuYW1lIjoiRmVlZGJhY2tGb3dhcmRBZG1pbiIsImlhdCI6MTcyMTMwODAxMiwiZXhwIjoxNzIxMzI2MDEyfQ.a55Q5wlaVizVQ0ujVkTeQJMQFxf5PgJCvLcQAxJsmKs'
        },
    })
    .then(response => response.json())
    .then(data => console.log(data))
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