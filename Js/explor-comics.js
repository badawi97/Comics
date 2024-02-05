async function searchComics() {
    const searchInput = document.getElementById('searchInput').value;
    const response = await fetch(`./Php/explor-comics.php?q=${encodeURIComponent(searchInput)}`);
    const result = await response.json();
    if (result.length === 0) {
        searchResults.innerHTML = 'No results found.';
    } else {

        displayComics(result);
    }
}

function displayComics(comics) {
    var comicsContainer = document.getElementById("comicsContainer");
    comicsContainer.innerHTML = "";
    comics.forEach(function (comic) {
        var comicCard = document.createElement("div");
        comicCard.className = "col-sm-3 mb-5";
        comicCard.innerHTML = `
            <div class="card">
                <span class="card-title">${comic.title}</span>
                <i onclick="addToFavorite(${comic.id})" class="fa fa-heart add-favourite-btn" aria-hidden="true"></i>
                <a href="comic-viewer.html?comic=${comic.id}">
                    <img class="d-block w-100" height="210" src="Images/Comics/Screenshot 2024-01-13 182825.png" alt="${comic.title}">
                </a>
                <a href="comic-viewer.html?comic=${comic.id}" class="overlay"></a>
            </div>
        `;
        comicsContainer.appendChild(comicCard);
    });
}


async function fetchComicTypes() {
    const response = await fetch(`./Php/comic-type.php`);
    const result = await response.json();
    populateRadioButtons(result);
}

function populateRadioButtons(comicTypes) {
    var radioButtonsContainer = document.getElementById("radioButtonsContainer");

    comicTypes.forEach(function (comicType) {
        var label = document.createElement("label");
        label.classList.add("white-button", "radio-button");
        label.setAttribute("for", comicType.name);
        label.innerHTML = `
        <input onchange="filterComics()" type="radio" id="${comicType.name}"  name="comicFilterType" class="hidden-radio" value="${comicType.id}">
        `
        var textNode = document.createTextNode(comicType.name);
        label.appendChild(textNode);
        radioButtonsContainer.appendChild(label);
    });
    setDefualtFilterType();
}

async function filterComics() {
    const searchInput = document.getElementById('searchInput').value;
    const radioButtons = document.querySelectorAll('.radio-button');
    radioButtons.forEach(btn => btn.classList.remove('active'));
    var selectedType = document.querySelector('input[name="comicFilterType"]:checked');
    selectedType.parentElement.classList.add('active');
    const response = await fetch(`./Php/explor-comics.php?type=${selectedType.value}&searchInput${searchInput}`);

    const result = await response.json();
    displayComics(result);
}

function setDefualtFilterType() {
    const filterType = document.getElementById('All');
    filterType.checked = true;
    filterComics();
}

fetchComicTypes();
