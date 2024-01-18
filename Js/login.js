document.getElementById('loginBtn').addEventListener('click', function () {
    showLoginPopup();
});

document.getElementById('closeBtn').addEventListener('click', function () {
    hideLoginPopup();
});

function hideLoginPopup() {
    document.getElementById('loginPopup').style.display = 'none';
}

function showLoginPopup() {
    document.getElementById('loginPopup').style.display = 'block';
}

function navigateToDashboard() {
    window.location.href = "dashboard.html";
}

function login() {

    loginForm = document.getElementById('loginForm');

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;


    fetch('http://localhost/Comics/Comics/Php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                loginForm.reset();
                hideLoginPopup();
                navigateToDashboard()
            } else {
                alert('invalid credential');
            }
        })
        .catch(error => {
            console.error('Login failed:', error);
        });
}

