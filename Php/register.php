<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Replace these values with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$database = "ComicsDb";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->UserName) && isset($data->Email) && isset($data->Password) && isset($data->ImagePath)) {
        $userName = $data->UserName;
        $email = $data->Email;
        $password = $data->Password;
        $imagePath = $data->ImagePath;

        // Perform validation or authentication logic here

        // For simplicity, let's assume a basic insert query
        $query = "INSERT INTO users (UserName, Email, Password, ImagePath) VALUES ($userName, $email, $password, $imagePath)";
        $stmt = $conn->prepare($query);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to register user']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

// Close connection
$conn->close();
