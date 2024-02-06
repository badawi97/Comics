let imageInput = document.getElementById('imageInput');
let imageProfile = document.getElementById('imageProfile');
if (imageInput) {
    imageProfile.src = 'Images/profile-img.png'
}
imageInput.onchange = evt => {
    const [file] = imageInput.files
    if (file) {
        imageProfile.src = URL.createObjectURL(file)
    }
    else {
        imageProfile.src = 'Images/profile-img.png'
    }
}

function submitForm() {
    var firstName = encodeURIComponent(document.getElementById("firstName").value);
    var lastName = encodeURIComponent(document.getElementById("lastName").value);
    var email = encodeURIComponent(document.getElementById("email").value);
    var password = encodeURIComponent(document.getElementById("Rpassword").value);
    var phoneNumber = encodeURIComponent(document.getElementById("phoneNumber").value);
    var address = encodeURIComponent(document.getElementById("address").value);
    var username = encodeURIComponent(document.getElementById("Rusername").value);

    var formData = new FormData();

    // Append form data
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('username', username);

    // Append image file
    var imageFile = document.getElementById('imageInput').files[0];
    if (imageFile) {
        formData.append('imageFile', imageFile);
    }

    var registrationForm = document.getElementById("registrationForm");
    // Send form data to the PHP file using AJAX
    fetch('./Php/register.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(() => {
            registrationForm.reset();
            window.location.href = "index.html";
            try {
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })

}
