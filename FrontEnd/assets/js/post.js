//var currentPost = sessionStorage.getItem(postId)
// var currentPostID = sessionStorage.getItem(postId)
// var currentPost = sessionStorage.getItem("66984bd446930466bd080228")
// let currentPostURLStart = "http://192.168.28.129:3000/api/posts/"
// let currentPostIDString = toString(currentPostID)
// let currentPostURL = currentPostURLStart.concat(currentPostIDString);

let serverIp = localStorage.getItem("serverIp");

window.onload = function() {
    /***Used for testing the payload contents***/
    //fetch('http://192.168.28.129:3000/api/posts/${currentPost}', { // Change to actual variable

    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);

    fetch(`${serverIp}/api/posts/${urlParams.get("id")}`, { // Change to actual variable
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('key')
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.postId);
        document.getElementById("title").innerHTML = data.message.title;
        document.getElementById("content").innerHTML = data.message.content;
        document.getElementById("tags").innerHTML = data.message.tags;
        //const title = data.message.title
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Post Fetch Failed');
    });
}