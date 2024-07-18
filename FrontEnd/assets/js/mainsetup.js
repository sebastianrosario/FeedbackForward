window.onload = function () {
    // Fetch data for the first call
    fetch("http://192.168.28.129:3000/api/posts/6699144d46930466bd0802db", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTkxMzU5NDY5MzA0NjZiZDA4MDJkMSIsInVzZXJuYW1lIjoiRmVlZGJhY2tGb3dhcmRBZG1pbiIsImlhdCI6MTcyMTMzNzAxNSwiZXhwIjoxNzIxMzU1MDE1fQ.WvCNk9XCiHK_xQPvmb_mwu0Qeqb5tC_bQKNuyhY3V0I"
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

    // Fetch data for trending posts
    fetch("http://192.168.28.129:3000/api/posts/filter/byupvotes/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTkxMzU5NDY5MzA0NjZiZDA4MDJkMSIsInVzZXJuYW1lIjoiRmVlZGJhY2tGb3dhcmRBZG1pbiIsImlhdCI6MTcyMTMzNzAxNSwiZXhwIjoxNzIxMzU1MDE1fQ.WvCNk9XCiHK_xQPvmb_mwu0Qeqb5tC_bQKNuyhY3V0I"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Trending posts fetched successfully!");
            const posts = data.message;

            if (posts.length > 0) {
                const firstItem = posts[0];

                const title = firstItem.title;
                const date = new Date(firstItem.createdAt).toLocaleDateString(); // Format date
                const user = firstItem.username;
                print(title);
                document.querySelector('.trending1.date').textContent = date;
                document.querySelector('.trending1.title').textContent = title;
                document.querySelector('.trending1.user').textContent = user;
            }
        } else {
            console.error('Failed to fetch trending posts.');
        }
    })
    .catch(error => {
        console.error('Error fetching trending posts:', error);
    });
};