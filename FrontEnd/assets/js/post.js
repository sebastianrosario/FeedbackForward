window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    // Fetch post data
    fetch(`http://192.168.28.129:3000/api/posts/${postId}`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const { title, content, tags, filePath, comments } = data.message;

        document.getElementById("title").innerHTML = title;
        document.getElementById("content").innerHTML = content;
        document.getElementById("tags").innerHTML = tags;
        document.getElementById("fileName").innerHTML = filePath;

        // Fetch and display the image
        fetch(`http://192.168.28.129:3000/files/${filePath}`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.blob())
        .then(blob => {
            const imageElement = document.getElementById('image');
            const objectURL = URL.createObjectURL(blob);
            imageElement.src = objectURL;
        })
        .catch(error => {
            console.error('Error fetching the image:', error);
            document.getElementById('image').alt = "Failed to load image";
        });

        // Generate comments
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

    // Submit a new comment
    document.getElementById('submit').addEventListener('click', function() {
        const textInput = document.getElementById('comment-text').value;
        if (textInput.trim() !== '') {
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
                    // Optionally, reload comments or clear the input field
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
