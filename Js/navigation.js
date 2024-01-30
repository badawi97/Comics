// navbar.js
document.addEventListener('DOMContentLoaded', function () {
    // Dynamically load navigation bar HTML
    fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
            // Insert navigation bar HTML into the document
            document.querySelector('#headerNavContainer').innerHTML = html;
            document.getElementById('loginBtn').addEventListener('click', function () {
                showLoginPopup();
            });

            document.getElementById('closeBtn').addEventListener('click', function () {
                hideLoginPopup();
            });

        })
        .catch(error => {
            console.error('Error loading navigation bar:', error);
        });
});


