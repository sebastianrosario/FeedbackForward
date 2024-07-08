document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault();
        
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const category = document.getElementById('category').value;
    const key = sessionStorage.getItem('key');

    fetch('http://192.168.28.129:3000/api/posts/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, body: body, key: key, category: category})
    })
    
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Post submitted successfully!');
            window.location.href = "index.html"; //Can change to the post itself later
        } else {
            alert('Failed to submit post.');
        }
        })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the post.');
    });
});