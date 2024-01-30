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


    fetch('./Php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password),
    })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                loginForm.reset();
                debugger
                localStorage.setItem('userId', result.data.userId);
                localStorage.setItem('userName', result.data.userName);
                localStorage.setItem('imagePath', result.data.imagePath);
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

