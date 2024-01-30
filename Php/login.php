<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();

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
    if (isset($_POST['username']) && isset($_POST['password'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Perform validation or authentication logic here

        // For simplicity, let's just perform a query to check if the user exists
        $query = "SELECT * FROM user WHERE UserName = '$username' AND Password = '$password'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $UserName = $row['UserName'];
            $Id = $row['Id'];
            $ImagePath = $row['ImagePath'];
            $_SESSION['username'] = $username;
            $_SESSION['password'] = $password;

            $data = [
                'userId' => $Id,
                'userName' => $UserName,
                'imagePath' => $ImagePath
            ];
            echo json_encode(['status' => 'success', 'message' => 'Login successful', 'data' => $data]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Incorrect password']);
        }
    } else {
        echo 'invalid input';
    }
} else {
    echo 'not login query';
}

// Close connection
$conn->close();
