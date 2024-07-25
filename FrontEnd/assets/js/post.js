let serverIp = localStorage.getItem("http://192.168.28.129:3000");

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    // Fetch post details
    fetch(`http://${serverIp}/api/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('key')}`
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const post = data.message;

            // Populate post details
            document.getElementById("title").innerHTML = post.title;
            document.getElementById("content").innerHTML = post.content;
            document.getElementById("tags").innerHTML = `Tags: ${post.tags.join(', ')}`;
            document.getElementById("fileName").src = `http://${serverIp}/files/${post.filePath}`;
            document.getElementById("fileName").alt = post.fileName;

            // Generate comments
            generateComments(post.comments);
        } else {
            console.error('Failed to fetch post data');
            alert('Failed to fetch post data');
        }
    })
    .catch(error => {
        console.error('Error fetching post data:', error);
        alert('Error fetching post data');
    });

    // Function to display comments
    function generateComments(commentsArray) {
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = ''; // Clear existing comments

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

    // Submit comment
    document.getElementById('submit').addEventListener('click', function() {
        const textInput = document.getElementById('commentInput').value;
        if (textInput.trim() !== '') {
            fetch(`http://${serverIp}/api/posts/${postId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('key')}`
                },
                body: JSON.stringify({ comment: textInput })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Comment submitted successfully.');
                    // Optionally clear the input field and reload comments
                    document.getElementById('commentInput').value = '';
                    fetchComments(); // Re-fetch comments to show the new one
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

    // Function to fetch and display comments
    function fetchComments() {
        fetch(`http://${serverIp}/api/posts/${postId}/comments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('key')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                generateComments(data.message.comments);
            } else {
                console.error('Failed to fetch comments');
            }
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
    }

    // Initial fetch of comments
    fetchComments();
};
