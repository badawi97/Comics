<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Replace these values with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$database = "ComicsDb";

$uploadDir = "../Images/Users/";

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}
$coverPath = "";
$imageFile = $_FILES['imageFile'];
$name = basename($imageFile['name']);
$tempFile = $imageFile['tmp_name'];
$targetFile = $uploadDir . $name;
$coverPath = $targetFile;
if (move_uploaded_file($tempFile, $targetFile)) {
    echo json_encode(array("success" => "not Failed to upload image."));
} else {
    echo json_encode(array("error" => "Failed to upload image."));
}

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
$coverPath = str_replace('../', '', $coverPath);




$sql = "INSERT INTO `user`(`UserName`, `Email`, `Password`, `FirstName`, `LastName`, `PhoneNumber`, `Address`, `ImagePath`)
        VALUES ('$username','$email','$password', '$firstName', '$lastName',  '$phoneNumber', '$address', '$coverPath')";


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
