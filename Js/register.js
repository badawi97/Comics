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