window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    sessionStorage.setItem('url', urlParams.get("id"));
    const userId = urlParams.get("id");

    fetch(`http://192.168.28.129:3000/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTkxMzU5NDY5MzA0NjZiZDA4MDJkMSIsInVzZXJuYW1lIjoiRmVlZGJhY2tGb3dhcmRBZG1pbiIsImlhdCI6MTcyMTk1ODc0NiwiZXhwIjoxNzIxOTc2NzQ2fQ.5wdAztFxYwXu0AkKqRQbuqBd6fsXn7zrf8VdNDbWKa4'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message._id);
            document.getElementById('username').innerHTML = data.message.userName;
            document.getElementById('bio').innerHTML = data.message.bio;
        } else {
            console.error('Failed to fetch user data');
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
}