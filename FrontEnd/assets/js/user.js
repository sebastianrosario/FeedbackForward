window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    sessionStorage.setItem('url', urlParams.get("id"));
    const userId = urlParams.get("id");

    fetch(`http://192.168.28.129:3000/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('key')
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message._id);
            document.getElementById('username').innerHTML = data.message.username;
            document.getElementById('bio').innerHTML = data.message.bio;
            const imageURL = data.message.picPath;
            const imageElement = document.getElementById('image');
            imageElement.src = `http://192.168.28.129:3000/files/${imageURL}`;
            console.log(data);
        } else {
            console.error('Failed to fetch user data');
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
}