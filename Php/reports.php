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

// Fetch comics from the database
$sql = "SELECT * FROM comic";
$result = $conn->query($sql);

$comics = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $comics[] = [
            'Title' => $row['Title'],
            'PublishedBy' => $row['PublishedBy'],
        ];
    }
}

// Output the comics data as JSON
header('Content-Type: application/json');
echo json_encode($comics);

$conn->close();
