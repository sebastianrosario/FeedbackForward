submit.onclick = function() {
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
};