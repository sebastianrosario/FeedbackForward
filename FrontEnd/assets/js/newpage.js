document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault();
        
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    fetch('/submit-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, body: body })
    })
    
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Post submitted successfully!');
            window.location.href = "index.html"; //Can change to the post it self later
        } else {
            alert('Failed to submit post.');
        }
        })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the post.');
    });
});