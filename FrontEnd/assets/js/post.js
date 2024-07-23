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
        const comments = data.message.comments;
        document.getElementById("title").innerHTML = data.message.title;
        document.getElementById("content").innerHTML = data.message.content;
        document.getElementById("tags").innerHTML = data.message.tags;
        document.getElementById("fileName").innerHTML = data.message.fileName;

        console.log(data);

        function generateComments(commentsArray) {
            const commentsContainer = document.getElementById('comments-container');
    
            commentsArray.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
    
                const commentName = document.createElement('h3');
                commentName.textContent = comment.username;
                commentElement.appendChild(commentName);
    
                const commentText = document.createElement('p');
                commentText.textContent = comment.content;
                commentElement.appendChild(commentText);
    
                const commentDate = document.createElement('span');
                commentDate.textContent = new Date(comment.createdAt).toLocaleDateString();
                commentElement.appendChild(commentDate);
    
                commentsContainer.appendChild(commentElement);
            });
        }
        generateComments(comments);
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

document.getElementById('submit-comment').addEventListener('click', () => {
    const textInput = document.getElementById('comment-text');
    alert(hello)
    if (textInput != null)
        {
        fetch(`http://192.168.28.129:3000/api/posts/${urlParams.get("id")}/comment`, { // Change to actual variable
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('key')
            },
            body: JSON.stringify(newComment)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Add the new comment to the local comments array and regenerate the comments
                comments.push(newComment);
                generateComments(comments);

                // Clear the form
                nameInput.value = '';
                textInput.value = '';
            } else {
                console.error('Failed to submit comment.');
            }
        })
        .catch(error => {
            console.error('Error submitting comment:', error);
        });
    }
    else{
        alert('Please fill out the comment field.');
    }
});
//get file path here & store it in a variable??