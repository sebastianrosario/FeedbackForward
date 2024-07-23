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
    //const filePath = new URLSearchParams(window.location.search);
    //console.log(urlParams);

    // fetch(`${serverIp}/api/posts/new`, {
    //fetch(`http://192.168.28.129:3000/api/posts/new`, {
    fetch(`http://192.168.28.129:3000/api/posts/${urlParams.get("id")}`, { // Change to actual variable
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('key')
        },
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        //console.log(data.postId);
        document.getElementById("title").innerHTML = data.message.title;
        document.getElementById("content").innerHTML = data.message.content;
        document.getElementById("tags").innerHTML = data.message.tags;
        document.getElementById("fileName").innerHTML = data.message.fileName;

        console.log(data);
        //document.getElementById("file").innerHTML = data.message.filePath;
        //const title = data.message.title
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Post Fetch Failed');
    });
    //get file path here & store it in a variable??
    //(`http://192.168.28.129:3000/api/posts/${urlParams.get("id")}`,
    //fetch(`${server-ip}/api/file/upload/${filePath.get("path")}`, {
    //    method: 'POST',
        //headers: {
        //    'Content-Type': 'application/json',
        //    'Authorization': 'Bearer ' + sessionStorage.getItem('key')
        //},
    //})
}
//get file path here & store it in a variable??