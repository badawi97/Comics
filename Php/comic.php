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
$query = "SELECT * FROM comic";
$result = mysqli_query($conn, $query);

$comics = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $comic = array(
            'id' => $row['Id'],
            'title' => $row['Discerption'],
            'description' => $row['PublishedBy'],
            'type_id' => $row['PublishedOn'],
            'published_by' => $row['Title '],
            'published_on' => $row['TyepId']
            // Add other columns as needed
        );
        $comics[] = $comic;
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($comics);
