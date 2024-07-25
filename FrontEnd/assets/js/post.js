// Function to handle comment submission
function handleCommentSubmission() {
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function() {
        const textInput = document.getElementById('comment-text').value;
        if (textInput.trim() !== '') {
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get("id");

            fetch(`http://192.168.28.129:3000/api/posts/${postId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('key')
                },
                body: JSON.stringify({ comment: textInput }) // Adjust as per your API requirements
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Handle success scenario
                    console.log('Comment submitted successfully.');
                    // Optionally, refresh comments here
                    generateComments([data.message]); // Refresh comments
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
}

// Function to generate comments
function generateComments(commentsArray) {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = ''; // Clear any existing comments

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

// Function to initialize the page content
function initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    // Fetch the post data
    fetch(`http://192.168.28.129:3000/api/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const comments = data.message.comments;
            const imageURL = data.message.filePath; 

            // Update the HTML elements with post data
            document.getElementById("title").innerHTML = data.message.title;
            document.getElementById("content").innerHTML = data.message.content;
            document.getElementById("tags").innerHTML = data.message.tags;
            const imageElement = document.getElementById('image');
            imageElement.src = `http://192.168.28.129:3000/files/${imageURL}`;
            imageElement.alt = "Post image";

            // Generate comments
            generateComments(comments);

        } else {
            console.error('Failed to fetch post data.');
        }
    })
    .catch(error => {
        console.error('Error fetching post data:', error);
    });
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    handleCommentSubmission();
});
