async function searchComics() {
    const searchInput = document.getElementById('searchInput').value;

    // Send an AJAX request to the PHP script
    const response = await fetch(`./Php/explor-comics.php?q=${encodeURIComponent(searchInput)}`);
    const result = await response.json();



    if (result.length === 0) {
        searchResults.innerHTML = 'No results found.';
    } else {

        displayComics(result);
    }
}

function displayComics(comics) {
    // Display the search results
    var comicsContainer = document.getElementById("comicsContainer");
    comicsContainer.innerHTML = "";
    comics.forEach(function (comic) {
        // Create and append comic card to container
        var comicCard = document.createElement("div");
        comicCard.className = "col-sm-3 mb-5";
        comicCard.innerHTML = `
            <div class="card">
                <a href="comic-viewer.html?comic=${comic.id}">
                    <img class="d-block w-100" height="210" src="Images/Comics/Screenshot 2024-01-13 182825.png" alt="${comic.title}">
                </a>
                <a href="comic-viewer.html?comic=${comic.id}" class="overlay"></a>
            </div>
        `;
        comicsContainer.appendChild(comicCard);
    });
}


// Function to fetch comic types from the server
async function fetchComicTypes() {
    const response = await fetch(`./Php/comic-type.php`);
    const result = await response.json();
    populateRadioButtons(result);
}

// Function to populate radio buttons with comic types
function populateRadioButtons(comicTypes) {
    var radioButtonsContainer = document.getElementById("radioButtonsContainer");

    comicTypes.forEach(function (comicType) {
        var label = document.createElement("label");
        label.setAttribute("for", comicType.name);
        label.classList.add("white-button", "radio-button");

        var input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("id", comicType.name);
        input.setAttribute("name", "comicFilterType");
        input.classList.add("hidden-radio");
        input.value = comicType.id;

        var textNode = document.createTextNode(comicType.name);

        label.appendChild(input);
        label.appendChild(textNode);

        radioButtonsContainer.appendChild(label);
    });

    // Add event listener to radio buttons for filtering
    var radioButtons = document.querySelectorAll('input[name="comicFilterType"]');
    radioButtons.forEach(async function (radioButton) {
        radioButton.addEventListener("change", await filterComics);
    });
}   

// Function to filter comics based on selected type
async function filterComics() {
    const searchInput = document.getElementById('searchInput').value;

    const radioButtons = document.querySelectorAll('.radio-button');
    radioButtons.forEach(btn => btn.classList.remove('active'));

    var selectedType = document.querySelector('input[name="comicFilterType"]:checked');

    selectedType.parentElement.classList.add('active');




    // Send selected type to server and fetch filtered comics
    const response = await fetch(`./Php/explor-comics.php?type=${selectedType.value}&searchInput${searchInput}`);

    const result = await response.json();
    displayComics(result);

}

fetchComicTypes();
