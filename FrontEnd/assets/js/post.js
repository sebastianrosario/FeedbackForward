let serverIp = localStorage.getItem("http://192.168.28.129:3000");

        window.onload = function() {
            const urlParams = new URLSearchParams(window.location.search);
            sessionStorage.setItem('url', urlParams.get("id"));

            fetch(`http://${serverIp}/api/posts/${urlParams.get("id")}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                const comments = data.message.comments;
                const imageURL = data.message.filePath;
                document.getElementById("title").innerHTML = data.message.title;
                document.getElementById("content").innerHTML = data.message.content;
                document.getElementById("tags").innerHTML = `Tags: ${data.message.tags.join(', ')}`;
                document.getElementById("fileName").innerHTML = data.message.fileName;

                fetch(`http://${serverIp}/files/${imageURL}`, {
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
                const submit = document.getElementById('submit');
                submit.onclick = function() {
                    const textInput = document.getElementById('comment-text').value;
                    if (textInput.trim() !== '') {
                        fetch(`http://${serverIp}/api/posts/${urlParams.get("id")}/comment`, {
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
                };
            });
        }