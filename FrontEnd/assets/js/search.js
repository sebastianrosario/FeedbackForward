window.onload = function () {

    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    sessionStorage.setItem('url', urlParams.get("id"));
    searchid = urlParams.get("id");

    fetch(`http://192.168.28.129:3000/api/posts/filter/search?sort=top&query=${searchid}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('key')
        }
    })
    .then(response => response.json())
    .then(data => {
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
            const id1 = firstItem._id;

            const imageElement1 = document.getElementById('trending1-image');
            const imageURL1 = firstItem.filePath;
            imageElement1.src = `http://192.168.28.129:3000/files/${imageURL1}`;

            document.getElementById('trending1-date').textContent = date1;
            document.getElementById('trending1-title').textContent = title1;
            document.getElementById('trending1-user').textContent = user1;
            document.getElementById('featuredTrending1-link').href = `post.html?id=${id1}`;

            //second element
            
            const title2 = secondItem.title;
            const date2 = new Date(secondItem.createdAt).toLocaleDateString(); // Format date
            const user2 = secondItem.username;
            const id2 = secondItem._id;

            const imageElement2 = document.getElementById('trending2-image');
            const imageURL2 = secondItem.filePath;
            imageElement2.src = `http://192.168.28.129:3000/files/${imageURL2}`;

            document.getElementById('trending2-date').textContent = date2;
            document.getElementById('trending2-title').textContent = title2;
            document.getElementById('trending2-user').textContent = user2;
            document.getElementById('featuredTrending2-link').href = `post.html?id=${id2}`;

            //third element
            const title3 = thirdItem.title;
            const date3 = new Date(thirdItem.createdAt).toLocaleDateString(); // Format date
            const user3 = thirdItem.username;
            const id3 = thirdItem._id;

            const imageElement3 = document.getElementById('trending3-image');
            const imageURL3 = thirdItem.filePath;
            imageElement3.src = `http://192.168.28.129:3000/files/${imageURL3}`;

            document.getElementById('trending3-date').textContent = date3;
            document.getElementById('trending3-title').textContent = title3;
            document.getElementById('trending3-user').textContent = user3;
            document.getElementById('featuredTrending3-link').href = `post.html?id=${id3}`;

            //forth element
            const title4 = forthItem.title;
            const date4 = new Date(forthItem.createdAt).toLocaleDateString(); // Format date
            const user4 = forthItem.username;
            const id4 = forthItem._id;

            const imageElement4 = document.getElementById('trending4-image');
            const imageURL4 = forthItem.filePath;
            imageElement4.src = `http://192.168.28.129:3000/files/${imageURL4}`;

            document.getElementById('trending4-date').textContent = date4;
            document.getElementById('trending4-title').textContent = title4;
            document.getElementById('trending4-user').textContent = user4;
            document.getElementById('featuredTrending4-link').href = `post.html?id=${id4}`;

            //fith
            const title5 = fithItem.title;
            const date5 = new Date(fithItem.createdAt).toLocaleDateString(); // Format date
            const user5 = fithItem.username;
            const id5 = fithItem._id;

            const imageElement5 = document.getElementById('trending5-image');
            const imageURL5 = firstItem.filePath;
            imageElement5.src = `http://192.168.28.129:3000/files/${imageURL5}`;

            document.getElementById('trending5-date').textContent = date5;
            document.getElementById('trending5-title').textContent = title5;
            document.getElementById('trending5-user').textContent = user5;
            document.getElementById('featuredTrending5-link').href = `post.html?id=${id5}`;
        } else {
            console.error('Failed to fetch trending posts.');
        }
    })
    .catch(error => {
        console.error('Error fetching trending posts:', error);
    });
}