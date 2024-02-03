document.addEventListener("DOMContentLoaded", function () {
    getComicsTypes();
});

function uploadComic() {
    var formData = new FormData(document.getElementById("comicForm"));

    // AJAX request to handle the file upload
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./Php/new-comic.php", true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            document.getElementById("output").innerHTML = xhr.responseText;
        }
    };

    xhr.send(formData);
}

function saveComic() {
    var comicForm = document.getElementById('comicForm');
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var comicType = document.getElementById("comicsTypes").value;



    var formData = new FormData();


    // Append form data
    formData.append('title', title);
    formData.append('description', description);
    formData.append('comicType', comicType);
    // Append image file
    var imageFile = document.getElementById('imageFiles').files;
    if (imageFile) {
        formData.append('image', imageFile);
    }

    uploadComic();

    fetch('./Php/new-comic.php', {
        method: 'POST',
        body: formData
    }).then(response => {
        comicForm.reset();
        window.location.href = "dashboard.html";
    }).catch(error => {
        // Handle error
    });
}

function getComicsTypes() {
    // Fetch comic types from PHP using AJAX
    fetch('./Php/comic-type.php')
        .then(response => response.json())
        .then(comicTypes => {
            // Populate select element with comic types
            var selectElement = document.getElementById('comicsTypes');
            comicTypes.forEach(comicType => {
                var option = document.createElement('option');
                option.value = comicType.id;
                option.textContent = comicType.name;
                option.setAttribute('data-translation-key', comicType.name);
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}



