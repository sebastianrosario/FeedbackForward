window.onload = function () {
    fetch("http://192.168.28.129:3000/api/posts/filter/byupvotes/",{
        method: "GET",
        headers:{
        'Content-Type': 'application/json',
        //'Authorization': "Bearer " + sessionStorage.getItem('key')
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGIzOGEyY2E3YjMwNTIxOWJhZDI3ZSIsInVzZXJuYW1lIjoidGVzdHRlc3R0ZXN0IiwiaWF0IjoxNzIxMzAyOTM2LCJleHAiOjE3MjEzMjA5MzZ9.TuvDe4St_wZVrujNAIKe7MXpJFpAShEzsQiGbE-DHAE"
        }
    })

    fetch("http://192.168.28.129:3000/api/posts/6699144d46930466bd0802db",{
        method: "GET",
        headers:{
        'Content-Type': 'application/json',
        //'Authorization': "Bearer " + sessionStorage.getItem('key')
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGIzOGEyY2E3YjMwNTIxOWJhZDI3ZSIsInVzZXJuYW1lIjoidGVzdHRlc3R0ZXN0IiwiaWF0IjoxNzIxMzAyOTM2LCJleHAiOjE3MjEzMjA5MzZ9.TuvDe4St_wZVrujNAIKe7MXpJFpAShEzsQiGbE-DHAE"
        }
    })
    .then(response => response.json())
    .then(data => { 
        if (data.success) {
            const message = data.message;
            
            // Extract data from the JSON response
            const title = message.title;
            const category = message.tags.join(', '); // Combine tags into a single string
            const date = new Date(message.createdAt).toLocaleDateString(); // Format date
            const user = message.username;

            // Update HTML elements with the fetched data
            document.querySelector('.article-category').textContent = category;
            document.querySelector('.article-date').textContent = date;
            document.querySelector('.article-title').textContent = title;
            document.querySelector('.article-username').textContent = user;
        } else {
            console.error('Failed to fetch article data.');
        }
    })
    .catch(error => {
        console.error('Error fetching article data:', error);
    });
};