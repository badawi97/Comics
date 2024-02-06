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
$comicTypeInt = !empty($comicType) ? (int)$comicType : 0;

// Build SQL query with prepared statement to prevent SQL injection
$sql = "";
$params = array();
if ($comicTypeInt === 11) {
    // If comicTypeInt is 11, get all records
    $sql = "SELECT * FROM comic WHERE PublishedBy = ?";
    $params[] = $userId;
} else {
    // Otherwise, filter records based on TypeId
    $sql = "SELECT * FROM comic WHERE TypeId = ? AND PublishedBy = ?";
    $params[] = $comicTypeInt;
    $params[] = $userId;
}

if (!empty($searchInput)) {
    // Search by title if searchInput is not empty
    $sql .= " AND Title LIKE ?";
    $params[] = "%$searchInput%";
}

// Prepare and bind parameters
$stmt = $conn->prepare($sql);
if ($stmt) {
    // Dynamically bind parameters
    $types = str_repeat("i", count($params));
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();

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

    // Output the search results as JSON after escaping special characters
    header('Content-Type: application/json');
    echo json_encode($searchResults, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);

    $stmt->close();
} else {
    // Error in prepared statement
    echo "Error in prepared statement: " . $conn->error;
}

$conn->close();
