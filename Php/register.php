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

// Perform the database insert
$sql = "INSERT INTO `user`(`UserName`, `Email`, `Password`, `FirstName`, `LastName`, `PhoneNumber`, `Address`)
        VALUES ('$username','$email','$password', '$firstName', '$lastName',  '$phoneNumber', '$address')";


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
