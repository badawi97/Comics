// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var changePasswordBtn = document.getElementById("changePassword");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
var userId = localStorage.getItem("userId");
// Fetch user data from the server
fetchProfileDetials();
async function fetchProfileDetials() {
  const response = await fetch(`Php/profile.php?userId=` + userId);

  const userData = await response.json();
  if (userData.length > 0) {
    const user = userData[0]; // Assuming only one user is fetched
    document.getElementById("fName").value = user.first_name;
    document.getElementById("lName").value = user.last_name;
    document.getElementById("email").value = user.email;
    document.getElementById("username").value = user.username;
    document.getElementById("phone").value = user.phone; // Assuming 'phone' is a field in your user data
    document.getElementById("address").value = user.address;
  }
}
async function savePassword() {
  const r = await fetch(`Php/profile.php?userId=` + userId);
  var pass = "";
  var oldPassword = document.getElementById("oldPassword").value;
  var newPassword = document.getElementById("newPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  const userData = await r.json();
  if (userData.length > 0) {
    const user = userData[0]; // Assuming only one user is fetched
    pass = user.password;
  }
  if (pass === oldPassword) {
    if (newPassword === confirmPassword && newPassword !== "") {
      var formData = new FormData();
      formData.append("id", userId);
      formData.append("firstName", document.getElementById("fName").value);
      formData.append("lastName", document.getElementById("lName").value);
      formData.append("email", document.getElementById("email").value);
      formData.append("username", document.getElementById("username").value);
      formData.append("phone", document.getElementById("phone").value);
      formData.append("address", document.getElementById("address").value);
      formData.append("password", newPassword);

      var response = await fetch("Php/edit-profile.php", {
        method: "POST",
        body: formData,
      });
      var data = await response.json();
      if (data.success) {
        alert("Profile updated successfully");
      } else {
        alert("Error updating profile");
      }
    } else {
      window.alert("Password is not Matched");
    }
  } else {
    window.alert("Password is Wrong");
  }
}

async function updateProfile() {
  document.getElementById("editSaveBtn");

  if (editSaveBtn.textContent === "Edit") {
    document.getElementById("fName").disabled = false;
    document.getElementById("lName").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("username").disabled = false;
    document.getElementById("phone").disabled = false;
    document.getElementById("address").disabled = false;
    editSaveBtn.textContent = "Save";
  } else {
    document.getElementById("fName").disabled = true;
    document.getElementById("lName").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("username").disabled = true;
    document.getElementById("phone").disabled = true;
    document.getElementById("address").disabled = true;
    editSaveBtn.textContent = "Edit";
    var formData = new FormData();
    formData.append("id", userId);
    formData.append("firstName", document.getElementById("fName").value);
    formData.append("lastName", document.getElementById("lName").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("username", document.getElementById("username").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("address", document.getElementById("address").value);

    var response = await fetch("Php/edit-profile.php", {
      method: "POST",
      body: formData,
    });
    var data = await response.json();
    if (data.success) {
      alert("Profile updated successfully");
    } else {
      alert("Error updating profile");
    }
  }
}
