document.getElementById('loginBtn').addEventListener('click', function () {
    document.getElementById('loginPopup').style.display = 'block';
});

document.getElementById('closeBtn').addEventListener('click', function () {
    document.getElementById('loginPopup').style.display = 'none';
});

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Perform validation or send data to server for authentication

    // For simplicity, let's assume the login is successful
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/Comics/Php/login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert('Login successful!');
            document.getElementById('loginPopup').style.display = 'none';
        }
    };
    xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
}
