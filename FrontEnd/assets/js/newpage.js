let serverIp = localStorage.getItem("serverIp");

document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault();
        
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const category = document.getElementById('category').value;

    // fetch(`${serverIp}/api/posts/new`, {
    fetch(`http://192.168.28.129:3000/api/posts/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('key')
        },
        body: JSON.stringify({ title: title, content: body, tags: [category]})
    })
    
    .then(response => response.json())
    .then(data => {
        if (data.success == true) {
            alert('Post submitted successfully!');
            console.log(data);
            // window.location.href = "index.html"; //Can change to the post itself later
            window.location.replace(`post.html?id=${data.postId}`)
        } else {
            alert('Failed to submit post.');
        }
        })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the post.');
    });
});