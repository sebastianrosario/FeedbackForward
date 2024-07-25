//var currentPost = sessionStorage.getItem(postId)
// var currentPostID = sessionStorage.getItem(postId)
// var currentPost = sessionStorage.getItem("66984bd446930466bd080228")
// let currentPostURLStart = "http://192.168.28.129:3000/api/posts/"
// let currentPostIDString = toString(currentPostID)
// let currentPostURL = currentPostURLStart.concat(currentPostIDString);

let serverIp = localStorage.getItem("serverIp");
postid = ''; 

window.onload = function() {
    /***Used for testing the payload contents***/
    //fetch('http://192.168.28.129:3000/api/posts/${currentPost}', { // Change to actual variable

    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    sessionStorage.setItem('url', urlParams.get("id"));
    postid = urlParams.get("id");
    //const filePath = new URLSearchParams(window.location.search);
    //console.log(urlParams);

    // fetch(`${serverIp}/api/posts/new`, {
    //fetch(`http://192.168.28.129:3000/api/posts/new`, {
    fetch(`http://192.168.28.129:3000/api/posts/${urlParams.get("id")}`, { // Change to actual variable
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        //console.log(data.postId);
        const comments = data.message.comments;
        const imageURL = data.message.filePath;
        document.getElementById("title").innerHTML = data.message.title;
        document.getElementById("content").innerHTML = data.message.content;
        document.getElementById("tags").innerHTML = data.message.tags;
        const imageElement = document.getElementById('image');
        imageElement.src = `http://192.168.28.129:3000/files/${imageURL}`;

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

    //comment handler
    document.addEventListener('DOMContentLoaded', function() {
        const submitButton = document.getElementById('submitComment');
        submitButton.addEventListener('click', function() {
            const textInput = document.getElementById('comment-text').value; // Corrected line
            alert(textInput);
        });
    });

/*
    const submitButton = document.getElementById('submitComment');
    submitButton.addEventListener('click', function() {
        const textInput = document.getElementsByClassName('button').value;
        if (textInput.trim() !== '') {
            fetch(`http://192.168.28.129:3000/api/posts/${urlParams.get("id")}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('key')
                },
                body: JSON.stringify({ content: textInput }) // Adjust as per your API requirements
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Handle success scenario
                    console.log('Comment submitted successfully.');
                } else {
                    console.error('Failed to submit comment.');
                }
            })
            .catch(error => {
                console.error('Error submitting comment:', error);
            });
        } else {
            alert('Please fill out the comment field.');
        }
    });  */
}

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitComment');
    submitButton.addEventListener('click', function() {
        const textInput = document.getElementById('comment-text').value; // Corrected line
        if (textInput.trim() !== '') {
            fetch(`http://192.168.28.129:3000/api/posts/${urlParams.get("id")}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('key')
                },
                body: JSON.stringify({ content: textInput }) // Adjust as per your API requirements
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Handle success scenario
                    console.log('Comment submitted successfully.');
                } else {
                    console.error('Failed to submit comment.');
                }
            })
            .catch(error => {
                console.error('Error submitting comment:', error);
            });
        } else {
            alert('Please fill out the comment field.');
        }
    });
});