document.addEventListener('DOMContentLoaded', function() {
    const submit = document.getElementById('submit');
    submit.onclick = function() {
        const textInput = document.getElementsByClassName('button').value;
        if (textInput.trim() !== '') {
            fetch(`http://192.168.28.129:3000/api/posts/${urlParams.get("id")}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('key')
                },
                body: JSON.stringify({ comment: textInput }) // Adjust as per your API requirements
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Handle success scenario
                    console.log('Comment submitted successfully.');
                } else {
                    console.error('Failed to submit comment.');
                }
            })
            .catch(error => {
                console.error('Error submitting comment:', error);
            });
        } else {
            alert('Please fill out the comment field.');
        }
    };
});
