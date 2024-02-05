<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "ComicsDb";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if user ID is provided
if (!isset($_POST['id'])) {
    die("User ID not provided");
}

$id = (int)$_POST['id']; // Sanitize user ID

// Prepare and bind parameters
$query = "UPDATE `user` SET `FirstName`=?, `LastName`=?, `UserName`=?, `Email`=?, `PhoneNumber`=?, `Address`=?, `Password`=? WHERE Id=?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssssissi", $firstName, $lastName, $username, $email, $phone, $address, $password, $id);

// Assign values from POST data
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$password = $_POST['password'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$username = $_POST['username'];

// Execute query
if ($stmt->execute()) {
    echo json_encode(array("message" => "User updated successfully"));
} else {
    echo json_encode(array("message" => "Error updating user"));
}

$stmt->close();
$conn->close();
?>
