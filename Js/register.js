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
    // Get form data
    var formData = new FormData(document.getElementById("registrationForm"));
    // Send form data to the PHP file using AJAX
    debugger
    fetch('./Php/register.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(text => {
            debugger
            console.log('Response from server:', text);
            // Parse the response text as JSON if it's JSON
            try {
                const data = JSON.parse(text);
                console.log('Parsed JSON data:', data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })

}
