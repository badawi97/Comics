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
$comicType = !empty($_GET['type']) ? $_GET['type'] : null;
$searchInput = !empty($_GET['searchInput']) ? $_GET['searchInput'] : null;
$userId = !empty($_GET['userId']) ? (int)$_GET['userId'] : 0;
$comicTypeInt = (int)$comicType;

// Build SQL query
$sql = "";
if ($comicTypeInt === 11) {
    // If comicTypeInt is 11, get all records
    $sql = "SELECT * FROM comic INNER JOIN favourite ON comic.Id =favourite.ComicId WHERE favourite.UserId=1";
} else {
    // Otherwise, filter records based on TypeId
    $sql = "SELECT * FROM comic INNER JOIN favourite ON comic.Id =favourite.ComicId WHERE favourite.UserId=1 AND
    typeId = $comicTypeInt";
}
$result = $conn->query($sql);
$searchResults = [];

if ($result->num_rows > 0) {
    // Fetch results and store them in an array
    while ($row = $result->fetch_assoc()) {
        $searchResults[] = [
            'id' => $row['Id'],
            'title' => $row['Title'],
            'publishedBy' => $row['PublishedBy'],
            'description' => $row['Description'],
            'publishedOn' => $row['PublishedOn'],
            'typeId' => $row['TypeId'],
            'coverImagePath' => $row['CoverImagePath']
        ];
    }
}

// Output the search results as JSON
header('Content-Type: application/json');
echo json_encode($searchResults);

$conn->close();
