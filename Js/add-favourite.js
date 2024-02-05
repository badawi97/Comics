function addToFavorite(comicId) {
    const userId = localStorage.getItem('userId');

    fetch('./Php/add-favourite.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comicId: comicId, userId: userId })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            alert(data)
        })
        .catch(error => {
            console.error('Error:', error); // Log error message
        });
}