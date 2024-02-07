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

$uploadDir = "../Images/Comics/";

// Create the upload directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}
$coverPath = "";

if (!empty($_FILES['imageFile']['name'])) {
    $imageFile = $_FILES['imageFile'];
    $name = basename($imageFile['name']);
    $tempFile = $imageFile['tmp_name'];
    $targetFile = $uploadDir . $name;
    $coverPath = $targetFile;

    if (move_uploaded_file($tempFile, $targetFile)) {
        // File uploaded successfully, store path in database

        // Create connection
        $conn = new mysqli($servername, $username, $password, $database);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $coverPath = str_replace('../', '', $coverPath);
        $title = $_POST['title'];
        $description = $_POST['description'];
        $comicsTypes = $_POST['comicsTypes'];
        $publishedBy = $_POST['publishedBy'];
        $publishedOn = date("Y-m-d");
        
        $stmt = $conn->prepare("INSERT INTO comic (CoverImagePath, Title, Description, TypeId, PublishedBy, PublishedOn) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $coverPath, $title, $description, $comicsTypes, $publishedBy, $publishedOn);


        // Execute statement
        if ($stmt->execute()) {
            echo json_encode(array("success" => "The file " . htmlspecialchars($name) . " has been uploaded and inserted into the database."));
        } else {
            echo json_encode(array("error" => "Sorry, there was an error inserting data into the database."));
        }

        // Close statement and connection
        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(array("error" => "Failed to upload image."));
    }
} else {
    echo json_encode(array("error" => "No file uploaded."));
}
