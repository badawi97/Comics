function displayComics(comics) {
    var comicsContainer = document.getElementById("comicsContainer");
    comicsContainer.innerHTML = "";
    comics.forEach(function (comic) {
        var comicCard = document.createElement("div");
        comicCard.className = "col-lg-3 mb-5";
        comicCard.innerHTML = `
            <div class="card">
                <span class="card-title">${comic.title}</span>
                <i onclick="addToFavorite(${comic.id})" class="fa fa-heart add-favourite-btn" aria-hidden="true"></i>
                <a href="comic-viewer.html?comic=${comic.id}">
                    <img class="d-block w-100" height="210" src="${comic.coverImagePath}" alt="${comic.title}">
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
        <input type="radio" id="${comicType.name}"  name="comicFilterType" class="hidden-radio" value="${comicType.id}">
        `
        var textNode = document.createTextNode(comicType.name);
        label.appendChild(textNode);
        radioButtonsContainer.appendChild(label);
        // Get the dynamically created input element
        var radioButton = label.querySelector('input[type="radio"]');

        // Attach event listener to the input element
        radioButton.addEventListener('click', searchMyComics);
    });
    setDefualtFilterType();
}

async function searchMyComics() {
    const userId = localStorage.getItem("userId");
    const searchInput = document.getElementById('searchInput').value;
    const radioButtons = document.querySelectorAll('.radio-button');
    radioButtons.forEach(btn => btn.classList.remove('active'));
    var selectedType = document.querySelector('input[name="comicFilterType"]:checked');
    selectedType.parentElement.classList.add('active');
    try {
        const response = await fetch(`./Php/my-comics.php?type=${selectedType.value}&searchInput=${searchInput}&userId=${userId}`);
        const result = await response.json();
        displayComics(result);
    } catch (error) {
        console.error('Error fetching comics:', error);
    }
}

async function setDefualtFilterType() {
    const filterType = document.getElementById('All');
    filterType.checked = true;
    await searchMyComics();
}

fetchComicTypes();
