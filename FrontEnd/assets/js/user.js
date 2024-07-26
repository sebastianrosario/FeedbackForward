window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    sessionStorage.setItem('url', urlParams.get("id"));
    const userId = urlParams.get("id");

    fetch(`http://192.168.28.129:3000/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(userId);
            document.getElementById('userName').innerHTML = data.userName;
            document.getElementById('bio').innerHTML = data.bio;
        } else {
            console.error('Failed to fetch user data');
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
}