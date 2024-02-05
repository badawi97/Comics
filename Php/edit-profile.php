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
    $response = array('success' => false, 'message' => 'User ID not provided');
    echo json_encode($response);
    exit;
}

$id = (int)$_POST['id']; // Sanitize user ID

// Assign values from POST data
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$userName = $_POST['username']; 
$password = $_POST['password']; 

// Prepare and bind parameters
if (!empty($password)) {
    $stmt = $conn->prepare("UPDATE `user` SET `FirstName`=?, `LastName`=?, `UserName`=?, `Email`=?, `PhoneNumber`=?, `Address`=?, `Password`=? WHERE Id=?");
    $stmt->bind_param("sssssssi", $firstName, $lastName, $userName, $email, $phone, $address, $password, $id);
} else {
    $stmt = $conn->prepare("UPDATE `user` SET `Password`=? WHERE Id=?");
    $stmt->bind_param("ssssssi", $password, $id);
}

if ($stmt->execute()) {
    $response = array('success' => true, 'message' => 'User updated successfully');
    echo json_encode($response);
} else {
    $response = array('success' => false, 'message' => 'Error updating user');
    echo json_encode($response);
}

$stmt->close();
$conn->close();
