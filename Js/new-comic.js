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
