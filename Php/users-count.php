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
// Query to get the count of users from the user table
$sql = "SELECT COUNT(*) AS user_count FROM user";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetch result as associative array
    $row = $result->fetch_assoc();
    // Output the user count
    echo $row["user_count"];
} else {
    echo "0"; // If no users found, output 0
}

$conn->close();
