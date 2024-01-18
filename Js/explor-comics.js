async function searchComics() {
    const searchInput = document.getElementById('searchInput').value;

    // Send an AJAX request to the PHP script
    const response = await fetch(`./Php/explor-comics.php?q=${encodeURIComponent(searchInput)}`);
    const result = await response.json();

    // Display the search results
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (result.length === 0) {
        searchResults.innerHTML = 'No results found.';
    } else {
        result.forEach(comic => {
            const comicDiv = document.createElement('div');
            comicDiv.textContent = `Title: ${comic.Title}, PublishedBy: ${comic.PublishedBy}, Genre: ${comic.genre}`;
            searchResults.appendChild(comicDiv);
        });
    }
}