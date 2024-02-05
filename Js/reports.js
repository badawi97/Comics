async function loadComicsReport() {
    const comics = await fetchComics();
    generatePieChart(comics);
}

async function fetchComics() {
    // Fetch the list of comics from the server
    const response = await fetch('./Php/reports.php');
    return response.json();
}

function generatePieChart(comics) {
    const genresCount = {};

    comics.forEach(comic => {
        genresCount[comic.genre] = genresCount[comic.genre] + 1 || 1;
    });

    const genres = Object.keys(genresCount);
    const counts = Object.values(genresCount);

    const ctx = document.getElementById('comicsChart').getContext('2d');
    const comicsChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: genres,
            datasets: [{
                data: counts,
                backgroundColor: getRandomColors(counts.length),
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Distribution of Comic Types'
            }
        }
    });
}

function getRandomColors(numColors) {
    // Generate random colors for the pie chart
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(randomColor);
    }
    return colors;
}
loadComicsReport();
