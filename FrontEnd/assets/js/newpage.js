
document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault();
        
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const category = document.getElementById('category').value;
    const fileInput = document.getElementById('fileName').files[0];

    if (fileInput) {
        alert(fileInput)
        const formData = new FormData();
        formData.append('file', fileInput);

        fetch(`http://192.168.28.129:3000:3000/api/file/upload`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('key')
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Upload successful');
                console.log("success");
                if (data.file) {
                    const filename = data.file.filename;
                    alert(filename);
                    submitPost(title, body, category, filename);
                }
            } else {
                alert('File upload failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while uploading the file.');
        });
    } else {
        submitPost(title, body, category, '');
    }
});

function submitPost(title, body, category, filename) {
    fetch(`http://192.168.28.129:3000:3000/api/posts/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('key')
        },
        body: JSON.stringify({ title: title, content: body, tags: [category], filePath: filename })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Post submitted successfully!');
            console.log(data);
            window.location.replace(`post.html?id=${data.postId}`);
        } else {
            alert('Failed to submit post: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the post.');
    });
}
