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

$id = isset($_GET['userId']) ? $_GET['userId'] : null;
if (!$id) {
    die("User ID not provided");
}

$userId = (int)$id;

// Fetch user from the database based on the provided user ID
$query = "SELECT * FROM `user` WHERE Id = $userId";
$result = mysqli_query($conn, $query);

$user = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $user[] = [
            'id' => $row['Id'],
            'first_name' => $row['FirstName'],
            'last_name' => $row['LastName'],
            'username' => $row['UserName'],
            'email' => $row['Email'],
            'address' => $row['Address'],
            'phone' => $row['PhoneNumber'],
            'password' => $row['Password']
        ];
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($user);
?>
