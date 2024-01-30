// Function to fetch comic types from the server
function fetchComicTypes() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./Php/comic-type.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var comicTypes = JSON.parse(xhr.responseText);
            populateRadioButtons(comicTypes);
        }
    };
    xhr.send();
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
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener("change", filterComics);
    });
}

// Function to filter comics based on selected type
function filterComics() {
    var selectedType = document.querySelector('input[name="comicFilterType"]:checked').value;

    // Send selected type to server and fetch filtered comics
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./Php/explor-comics.php?type=" + selectedType, true);
    xhr.onreadystatechange = function () {
        debugger
        if (xhr.readyState === 4 && xhr.status === 200) {
            var comics = JSON.parse(xhr.responseText);
            displayComics(comics);
        }
    };
    xhr.send();
}

// Function to display filtered comics
function displayComics(comics) {
    var comicsContainer = document.getElementById("comicsContainer");
    comicsContainer.innerHTML = ""; // Clear previous comics

    comics.forEach(function (comic) {
        debugger
        // Create and append comic card to container
        var comicCard = document.createElement("div");
        comicCard.textContent = comic.title; // Example: Replace with actual comic details
        comicsContainer.appendChild(comicCard);
    });
}

// Call fetchComicTypes when the page is loaded
fetchComicTypes();