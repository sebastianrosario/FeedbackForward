//var currentPost = sessionStorage.getItem(postId)
// var currentPostID = sessionStorage.getItem(postId)
// var currentPost = sessionStorage.getItem("66984bd446930466bd080228")
// let currentPostURLStart = "http://192.168.28.129:3000/api/posts/"
// let currentPostIDString = toString(currentPostID)
// let currentPostURL = currentPostURLStart.concat(currentPostIDString);

let serverIp = localStorage.getItem("serverIp");
postid = ''; 

window.onload = function() {
    
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    sessionStorage.setItem('url', urlParams.get("id"));
    postid = urlParams.get("id");

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
        const imageURL = data.message.filePath;
        document.getElementById("title").innerHTML = data.message.title;
        document.getElementById("content").innerHTML = data.message.content;
        document.getElementById("tags").innerHTML = data.message.tags;
        document.getElementById("author").innerHTML = data.message.username;
        document.getElementById("Likes").innerHTML= "Likes: " + date.message.upvotes;
        //href = http://127.0.0.1:3000/FrontEnd/user.html?id=FeedbackFowardAdmin
        const imageElement = document.getElementById('image');
        imageElement.src = `http://192.168.28.129:3000/files/${imageURL}`;

        //alert(`./user.html?id=${data.message.username}`);
        /*const authorLink = document.getElementById('authorLink');
        authorLink.innerHTML = message.username;
        authorLink.href = `http://127.0.0.1:3000/FrontEnd/user.html?id=${message.username}`;*/

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
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Post Fetch Failed');
    });
    document.addEventListener('DOMContentLoaded', function() {
        const submitButton = document.getElementById('submitComment');
        submitButton.addEventListener('click', function() {
            const textInput = document.getElementById('comment-text').value; // Corrected line
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitComment');
    submitButton.addEventListener('click', function() {
        const textInput = document.getElementById('comment-text').value; // Corrected line
        if (textInput.trim() !== '') {
            fetch(`http://192.168.28.129:3000/api/posts/${postid}/comment`, {
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
                    window.location.reload();
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

document.addEventListener('DOMContentLoaded', function() {
    const likeButton = document.getElementById('likeButton');

    // Check if the post is liked or not
    const isLiked = localStorage.getItem('likedPost') === 'true';

    // Update button state
    if (isLiked) {
        likeButton.classList.add('liked');
        likeButton.innerHTML = '<i class="ri-thumb-up-fill"></i> Liked';
    }

    likeButton.addEventListener('click', function() {
        // Toggle the like state
        if (likeButton.classList.contains('liked')) {
            likeButton.classList.remove('liked');
            likeButton.innerHTML = '<i class="ri-thumb-up-line"></i> Like';
            localStorage.setItem('likedPost', 'false');
        } else {
            likeButton.classList.add('liked');
            likeButton.innerHTML = '<i class="ri-thumb-up-fill"></i> Liked';
            localStorage.setItem('likedPost', 'true');
            fetch(`http://192.168.28.129:3000/api/posts/${postid}/upvote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('key')
                },
            })
            .catch(error => {
                console.error('Error submitting comment:', error);
            });
            window.location.reload();
        }
    });
});
