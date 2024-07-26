window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    sessionStorage.setItem('url', urlParams.get("id"));
    postid = urlParams.get("id");

    fetch(`http://192.168.28.129:3000/api/users/${urlParams.get("id")}`, { // Change to actual variable
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('userName').innerHTML = data.message.userName;
        document.getElementById('bio').innerHTML = data.message.bio;
    });
}