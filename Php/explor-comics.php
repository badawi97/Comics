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

// Get the search query from the URL parameter
$searchQuery = $_GET['q'];

// Perform a simple search in the 'comic' table based on the title
$sql = "SELECT * FROM comic WHERE Title LIKE '%$searchQuery%'";
$result = $conn->query($sql);
$searchResults = [];

if ($result->num_rows > 0) {
    // Fetch results and store them in an array
    while ($row = $result->fetch_assoc()) {
        $searchResults[] = [
            'Title' => $row['Title'],
            'PublishedBy' => $row['PublishedBy'],
        ];
    }
}

// Output the search results as JSON
header('Content-Type: application/json');
echo json_encode($searchResults);

$conn->close();
