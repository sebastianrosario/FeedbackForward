window.onload = function () {
    // Fetch data for the first call
    fetch("http://192.168.28.129:3000/api/posts/6699144d46930466bd0802db", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
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
            document.getElementById('featuredArticle1-category').textContent = category;
            document.getElementById('featuredArticle1-date').textContent = date;
            document.getElementById('featuredArticle1-title').textContent = title;
            document.getElementById('featuredArticle1-username').textContent = user;
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
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Trending posts fetched successfully!");
            const posts = data.message;

            if (posts.length > 0) {
                const firstItem = posts[0];
                const secondItem = posts[1];
                const thirdItem = posts[2];
                const forthItem = posts[3];
                const fithItem = posts[4];

                //first element 
                const title1 = firstItem.title;
                const date1 = new Date(firstItem.createdAt).toLocaleDateString(); // Format date
                const user1 = firstItem.username;

                document.getElementById('trending1-date').textContent = date1;
                document.getElementById('trending1-title').textContent = title1;
                document.getElementById('trending1-user').textContent = user1;

                //second element
                
                const title2 = secondItem.title;
                const date2 = new Date(secondItem.createdAt).toLocaleDateString(); // Format date
                const user2 = secondItem.username;

                document.getElementById('trending2-date').textContent = date2;
                document.getElementById('trending2-title').textContent = title2;
                document.getElementById('trending2-user').textContent = user2;

                //third element
                const title3 = thirdItem.title;
                const date3 = new Date(thirdItem.createdAt).toLocaleDateString(); // Format date
                const user3 = thirdItem.username;

                document.getElementById('trending3-date').textContent = date3;
                document.getElementById('trending3-title').textContent = title3;
                document.getElementById('trending3-user').textContent = user3;

                //forth element
                const title4 = forthItem.title;
                const date4 = new Date(forthItem.createdAt).toLocaleDateString(); // Format date
                const user4 = forthItem.username;

                document.getElementById('trending4-date').textContent = date4;
                document.getElementById('trending4-title').textContent = title4;
                document.getElementById('trending4-user').textContent = user4;

                //fith
                const title5 = fithItem.title;
                const date5 = new Date(fithItem.createdAt).toLocaleDateString(); // Format date
                const user5 = fithItem.username;

                document.getElementById('trending5-date').textContent = date5;
                document.getElementById('trending5-title').textContent = title5;
                document.getElementById('trending5-user').textContent = user5;
            }
        } else {
            console.error('Failed to fetch trending posts.');
        }
    })
    .catch(error => {
        console.error('Error fetching trending posts:', error);
    });
};