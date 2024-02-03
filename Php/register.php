<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Replace these values with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$database = "ComicsDb";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process form data
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$password = $_POST['password'];
$phoneNumber = $_POST['phoneNumber'];
$address = $_POST['address'];
$username = $_POST['username'];
$imagePath = '';

if (!empty($_FILES['image']['name'][0])) {
    $imageFiles = $_FILES['image'];

    foreach ($imageFiles['name'] as $key => $name) {
        $tempFile = $imageFiles['tmp_name'][$key];
        $targetFile = '../Images/Users/' . $name;
        $imagePath = 'Images/Users/' . $name;
        if (move_uploaded_file($tempFile, $targetFile)) {
            $output .= "Image '$name' uploaded successfully.<br>";
        } else {
            $output .= "Failed to upload image '$name'.<br>";
        }
    }
}



$sql = "INSERT INTO `user`(`UserName`, `Email`, `Password`, `FirstName`, `LastName`, `PhoneNumber`, `Address`, `ImagePath`)
        VALUES ('$username','$email','$password', '$firstName', '$lastName',  '$phoneNumber', '$address', '$imagePath')";


if ($conn->query($sql) === TRUE) {
    // Registration successful
    $response = array('status' => 'success', 'message' => 'Registration successful');
    echo json_encode($response);
} else {
    // Registration failed
    $response = array('status' => 'error', 'message' => 'Error: ' . $conn->error);
    echo json_encode($response);
}

// Close the database connection
$conn->close();
