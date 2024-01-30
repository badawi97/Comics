<?php
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

// SQL query to fetch comic types from the comicType table
$sql = "SELECT id, name FROM comicType";

$result = $conn->query($sql);

$comicTypes = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $comicTypes[] = array(
            "id" => $row["id"],
            "name" => $row["name"]
        );
    }
}

$conn->close();

// Return comic types as JSON data
header("Content-Type: application/json");
echo json_encode($comicTypes);
?>
